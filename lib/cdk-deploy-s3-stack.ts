import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';

export class CdkDeployS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const envContext = this.node.tryGetContext("env");
    console.log("CLI-set context value: ", envContext);

    const env = this.node.tryGetContext(envContext);
    console.log("Dynamic env: ", env);

    const bucket = new Bucket(
      this,
      "S3Bucket",
      {
        bucketName: `your-bucket-name-12345-${env.env}`,
        versioned: true,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        removalPolicy: RemovalPolicy.DESTROY
      }
    )
  }
}
