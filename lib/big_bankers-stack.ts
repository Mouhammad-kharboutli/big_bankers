import * as cdk from "aws-cdk-lib";
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

import path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BigBankersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // retrieve stripe api key from secret manager
    const stripeKeySecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "payment/stripeApiKey",
      "stripe_api_key"
    );

    const stripe_api_key = stripeKeySecret.secretValue.unsafeUnwrap();

    // define payment confirmation lambda
    const paymentConfirmationLambda = new lambda.Function(this, "payment-confirmation", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.paymentConfirmation",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "payment-confirmation/output")
      ),
      environment: {
        STRIPE_API_KEY: stripe_api_key,
      },
    });

    // get existing queue
    const queue = sqs.Queue.fromQueueArn(this, "booking_confirmed", "arn:aws:sqs:eu-west-1:172873359886:booking_confirmed")

    const eventSource = new lambdaEventSources.SqsEventSource(queue);

    paymentConfirmationLambda.addEventSource(eventSource);
  }
}
