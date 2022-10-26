import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BigBankersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const fn = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.preAuthorization",
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda-handler")),
    });

    // example resource
    // const queue = new sqs.Queue(this, 'BigBankersQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
