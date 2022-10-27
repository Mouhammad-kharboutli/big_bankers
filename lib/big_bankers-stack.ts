import * as cdk from "aws-cdk-lib";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";

import path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BigBankersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 get access to the secret object
    const stripeKeySecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "payment/stripeApiKey",
      "stripe_api_key"
    );

    const stripe_api_key = stripeKeySecret.secretValue.toString();

    // The code that defines your stack goes here
    const fn = new lambda.Function(this, "payment-confirmation", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.paymentConfirmation",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "payment-confirmation/output")
      ),
      environment: {
        STRIPE_API_KEY: stripe_api_key,
      },
    });

    // example resource
    // const queue = new sqs.Queue(this, 'BigBankersQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
