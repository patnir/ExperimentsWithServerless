## Miscellaneous notes and frequently used resources

Node and NPM version checks: 
	node -v
	npm -v

NPM List All Packages: 

	npm list -g --depth=0

##### INTRODUCTION

Microservices: 
"You can get around this by running your entire application inside a single function as a monolith and handling the routing yourself. But this isn’t recommended since it is better to reduce the size of your functions. We’ll talk about this below."

Every time your function is triggered, it is invoked in a new environment. You don't have access to teh execution context of the previous event. 

> This could definitely be an issue depending on the interconnectedness of your product. 

Actual lamda function is invoked only ocne per container instantiation. 


Stateless functions: 
Functions inside stateless containers
Cannot run ocde that executes long after or prior event
"You have to effectively assume that your function is invoked anew every single time."

Cold Starts: 
Function brought up on demand, so there is latency. 
Warm start when other event triggers your function.

**What is AWS Lamda?**
Max execution duration = 5 minutes
Ephemeral disk space = /tmp directory, subsequenct invocations will not have access to this.
Package size = all your code necessary to run your function. 


```javascript
exports.myHandler = function(event, context, callback) {
	// Do stuff
	callback(Error error, Object result);
}
```

event = info about event that triggered the function
context = info about the runtime that is executing  
callback = after work, call callback

You are not going to be handling concurrent requests in your code. 

Container is invoked only on instantiation. Lamda function is called on every invocation. 

Come back: Not a very reliable way to make our Lambda functions stateful. This is because we just don’t control the underlying process by which Lambda is invoked or it’s containers are cached.


Advantage of serverless apps: 
You need to only worry about your code and nothing else. Low maintenance: not having to manage servers yourself. 

##### SET UP YOUR AWS ACCOUNT

IAM policy: rules defining the operations allowed/ denied to be performed on an AWS resources. 

IAM role: Identity with permission policies that determine what teh identity can and cannot do in AWS but it does not have any credentials associated with it. 

IAM group: Collection of IAM users with all the same permissions. 

ARN: identifier for a resource in AWS

Examples

```
<!-- Elastic Beanstalk application version -->
arn:aws:elasticbeanstalk:us-east-1:123456789012:environment/My App/MyEnvironment

<!-- IAM user name -->
arn:aws:iam::123456789012:user/David

<!-- Amazon RDS instance used for tagging -->
arn:aws:rds:eu-west-1:123456789012:db:mysql-db

<!-- Object in an Amazon S3 bucket -->
arn:aws:s3:::my_corporate_bucket/exampleobject.png
```

> The **Serverless Framework** enables developers to **deploy backend applications as independent functions** that will be deployed to *AWS Lambda*. It also configures AWS Lambda to **run your code in response to HTTP requests** using *Amazon API Gateway*.


**Babel** is a transpiler for JavaScript best known for its ability to turn ES6 (the next version of JavaScript) into code that runs in your browser



##### SETTING UP THE SERVERLESS BACKEND

**Dynamo DB**

cross-origin resource sharing (**CORS**) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. 


### Steps so far

1. [Create an IAM user](https://serverless-stack.com/chapters/create-an-iam-user.html)

2. [Configure the AWS CLI](https://serverless-stack.com/chapters/configure-the-aws-cli.html)
```
$ sudo pip install awscli
$ aws configure
```
3. [Create a DynamoDB Table](https://serverless-stack.com/chapters/create-a-dynamodb-table.html)

4. [Create an S3 Bucket](https://serverless-stack.com/chapters/create-an-s3-bucket-for-file-uploads.html)
- Enable CORS
- Save Bucket Name

5. [Create a Cognito User Pool](https://serverless-stack.com/chapters/create-a-cognito-user-pool.html)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Choose username attributes
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get Pool ARN
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get Pool Id 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- User Pool Name

6. [Create App Client](https://serverless-stack.com/chapters/create-a-cognito-user-pool.html)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get App client id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get App client name

7. [Create Domain Name](https://serverless-stack.com/chapters/create-a-cognito-user-pool.html)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get domain name

8. [Create Cognito Test User](https://serverless-stack.com/chapters/create-a-cognito-test-user.html)
```
# Create User
$ aws cognito-idp sign-up \
  --region YOUR_COGNITO_REGION \
  --client-id YOUR_COGNITO_APP_CLIENT_ID \
  --username admin@example.com \
  --password Passw0rd!

# Verify User
$ aws cognito-idp admin-confirm-sign-up \
  --region YOUR_COGNITO_REGION \
  --user-pool-id YOUR_COGNITO_USER_POOL_ID \
  --username admin@example.com
```

9. [Set up the Serverless Framework](https://serverless-stack.com/chapters/setup-the-serverless-framework.html)
- Use AWS Lambda and Amazon API Gateway
