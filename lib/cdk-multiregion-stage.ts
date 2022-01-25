import { Stage, StageProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { NetworkStack } from './network-stack'
import * as config from '../config.json'
import { ComputeStack } from './compute-stack'

export class DevStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props)

    const devNetwork = new NetworkStack(this, 'network', {
      vpcName: config.environments.dev.name + '-vpc',
      cidrBlock: config.environments.dev.cidr_block,
    })

    new ComputeStack(this, 'compute', {
      vpc: devNetwork.vpc,
    })
  }
}

export class ProdStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props)

    const prodNetwork = new NetworkStack(this, 'network', {
      vpcName: config.environments.production.name + '-vpc',
      cidrBlock: config.environments.production.cidr_block,
    })

    new ComputeStack(this, 'compute', {
      vpc: prodNetwork.vpc,
    })
  }
}
