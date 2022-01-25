import { aws_codecommit, pipelines, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as config from '../config.json'
import { DevStage, ProdStage } from './cdk-multiregion-stage'

export class CdkMultiregionPipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const repo = new aws_codecommit.Repository(this, 'repo', {
      repositoryName: 'cdkmultiregion',
    })

    const pipeline = new pipelines.CodePipeline(this, 'pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.codeCommit(repo, 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    })

    pipeline.addStage(
      new DevStage(this, 'dev', {
        env: {
          account: config.environments.dev.env.account,
          region: config.environments.dev.env.region,
        },
      }),
    )
    pipeline.addStage(
      new ProdStage(this, 'prod', {
        env: {
          account: config.environments.production.env.account,
          region: config.environments.production.env.region,
        },
      }),
    )
  }
}
