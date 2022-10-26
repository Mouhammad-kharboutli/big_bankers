import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";

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

    // Define GATEWAY API
    const api = new apiGateway.LambdaRestApi(this, 'payments', {
      handler: fn,proxy:false
    });


    api.root.addMethod('ANY');
    
    const preAuth = api.root.addResource('pre-auth-api');
    preAuth.addMethod('POST');

    // example resource
    // const queue = new sqs.Queue(this, 'BigBankersQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
