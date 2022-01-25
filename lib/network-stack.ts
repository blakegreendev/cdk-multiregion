import { Stack, StackProps } from 'aws-cdk-lib'
import { Vpc, VpcProps } from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'

interface NetworkProps extends StackProps {
  readonly cidrBlock: VpcProps['cidr']
  readonly vpcName: string
}

export class NetworkStack extends Stack {
  public readonly vpc: Vpc
  constructor(scope: Construct, id: string, props: NetworkProps) {
    super(scope, id, props)

    this.vpc = new Vpc(this, 'vpc', {
      vpcName: props.vpcName,
      cidr: props.cidrBlock,
    })
  }
}
