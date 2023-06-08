// import { Construct, Stack, StackProps, Tag } from "@aws-cdk/core";
// import {Stack, StackProps, App, aws_ec2} from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
// import * as cdk from '@aws-cdk/core';
// import { Port, SecurityGroup, SubnetType, Vpc } from "@aws-cdk/aws-ec2";

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly appSg: ec2.SecurityGroup;
  public readonly dbSg: ec2.SecurityGroup;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, "VPC", {
      enableDnsHostnames: true,
      enableDnsSupport: true,
      natGateways: 1, // nat gateway count
      maxAzs: 2,
      subnetConfiguration: [
        { name: "Public", subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        { name: "Private", subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, cidrMask: 24 },
        { name: "Isolated", subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 24 }
      ]
    });
    // this.vpc.node.applyAspect(new Tag("Name", `vpc`));

    this.appSg = new ec2.SecurityGroup(this, "AppSg", {
      allowAllOutbound: true,
      vpc: this.vpc,
      securityGroupName: `app`,
      description: `app`
    });
    this.appSg.addIngressRule(
      this.appSg,
      ec2.Port.tcp(80),
      "allow http access from alb"
    );
    // this.appSg.node.applyAspect(new Tag("Name", `app`));

    this.dbSg = new ec2.SecurityGroup(this, "DbSg", {
      allowAllOutbound: true,
      vpc: this.vpc,
      securityGroupName: `db`,
      description: `db`
    });
    this.dbSg.addIngressRule(
      this.appSg,
      ec2.Port.tcp(3306),
      "allow db access from app server"
    );
    // this.dbSg.node.applyAspect(new Tag("Name", `db`));
  }
}
