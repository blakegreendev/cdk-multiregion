import { Stack, StackProps } from 'aws-cdk-lib'
import {
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Vpc,
  VpcProps,
} from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'

export interface ComputeProps extends StackProps {
  vpc: Vpc
}

export class ComputeStack extends Stack {
  private vpc: Vpc
  constructor(scope: Construct, id: string, props: ComputeProps) {
    super(scope, id, props)

    const vpc = props.vpc

    new Instance(this, 'instance', {
      vpc,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.SMALL),
      machineImage: MachineImage.latestAmazonLinux(),
    })
  }
}
