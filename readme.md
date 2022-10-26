# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template



## Steps to Work
1. Copy the AWS credentials before you deploy your resources to AWS 
2. Run that credentials in your terminal 
3. Run npx cdk deploy whenever you had changes to your resources files

# If you want to change the resources that we have change this file
big_bankers/lib/big_bankers-stack.ts
## Note:  build TS files inside Lib/Lambda_functions before your push to AWS because AWS accept only JS files not TS files 
