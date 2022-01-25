#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CdkMultiregionPipeline } from '../lib/cdk-multiregion-pipeline'
import * as config from '../config.json'

const app = new cdk.App()
new CdkMultiregionPipeline(app, 'CdkMultiregionStack', {
  env: {
    account: config.cdk_pipeline.build_environment.account,
    region: config.cdk_pipeline.build_environment.region,
  },
})
