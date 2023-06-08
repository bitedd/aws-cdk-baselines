
This project builds necessary aws services for various tests.

# Prerequisite

* CDK
  + CDK version 2.x

* NodeJS
  + CDK usually recommends the LTS version of NodeJS.

* AWS credentials

  Recommend SSO login method using IAM Identity Center.
  Alternatively, it is not bad to use IAM credential information(but less secure).
  

# Limitation
* region

  These CDK examples were tested in the north virgina region(us-east-1). So due to resources not available in certain regions/AZs (such as certain instance types), it may fail in other regions.


# How to use

### Choose 
Find the cdk sample that builds the aws resources needed for testing. During this process you will be able to check the diagrams for each project.

### Deploy the cdk stack 

* build
```
npm run build
```

* compare stack with the deployed stack
```
cdk diff --profile {aws profile name}
```

* deploy
```
cdk deploy --profile {aws profile name}
```

* destroy
```
cdk destroy 
```


