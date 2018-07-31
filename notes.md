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

**Cognito User Pool**
Amazon Cognito User Pool makes it easy for developers to add sign-up and sign-in functionality to web and mobile applications.

**Cognito Identity Pool**
Amazon Cognito Federated Identities enables developers to create unique identities for your users and authenticate them with federated identity providers. 
> With a federated identity, you can obtain temporary, limited-privilege AWS credentials to securely access other AWS services such as Amazon DynamoDB, Amazon S3, and Amazon API Gateway.

**User Pool vs Identity Pool** 

User Pool: 
- Easy for developers to add sign up and sign in functionality 
- Serves as your own identity porvider to maintain a user directory
- Supports user registration and sign-in
- Provisions identity tokens for signed-in users

Identity Pool: 
- Enables deverlopers to create unique identities for your users 
- Authenticate users with federated identity providers
- With federal identity, you can obtain temporary and limited AWS credentials to securely acces other AWS services such as S3, API Gateway, DynamoDB

Cognito Identity Pool simple takes all your identity porvides and puts tehm together

> The Cognito User Pool stores all your users which then plugs into your Cognito Identity Pool which can give your users access to your AWS services.


### Steps so far

1. [Create an IAM user](https://serverless-stack.com/chapters/create-an-iam-user.html)

2. [Configure the AWS CLI](https://serverless-stack.com/chapters/configure-the-aws-cli.html)
```
$ sudo pip install awscli
$ aws configure
```

#### SETTING UP THE SERVERLESS BACKEND
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

#### BUILDING A SERVERLESS REST API

10. [Create Node API](https://serverless-stack.com/chapters/add-a-create-note-api.html)
- create.js
- udpate serverless.yml
- wrote test in mocks folder
- refactored by moving code to libs folder

11. [Get Node API](https://serverless-stack.com/chapters/add-a-get-note-api.html) Same process as create: 
- get.js
- update serverless
- use refactored code in libs folder
- test in mocks folder

12. [Add List Node API](https://serverless-stack.com/chapters/add-a-list-all-the-notes-api.html)

13. [Add Update Node API](https://serverless-stack.com/chapters/add-an-update-note-api.html)

14. [Add Delete Node API](https://serverless-stack.com/chapters/add-a-delete-note-api.html)

#### DEPLOYING THE BACKEND

15. [Deploy the API](https://serverless-stack.com/chapters/deploy-the-apis.html)
```
$ serverless deploy

# To deploy multiple profiles: 
$ serverless deploy --aws-profile myProfile

# Deploy a single function
$ serverless deploy function -f list

# Service Informatino Example
Service Information
service: notes-app-api
stage: prod
region: us-east-1
api keys:
  None
endpoints:
  POST - https://ly55wbovq4.execute-api.us-east-1.amazonaws.com/prod/notes
  GET - https://ly55wbovq4.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
  GET - https://ly55wbovq4.execute-api.us-east-1.amazonaws.com/prod/notes
  PUT - https://ly55wbovq4.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
  DELETE - https://ly55wbovq4.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
functions:
  notes-app-api-prod-create
  notes-app-api-prod-get
  notes-app-api-prod-list
  notes-app-api-prod-update
  notes-app-api-prod-delete

ly55wbovq4 is our API Gateway ID
us-east-1 is our API Gateway Region

```
16. [Create a Cognito Identity Pool](https://serverless-stack.com/chapters/create-a-cognito-identity-pool.html)

> I think at some point I can just rely on Google and Facebook as login options and not care about having Amazon's Cognito User Pool as a way to create new accounts. 

17. [Test the APIs](https://serverless-stack.com/chapters/test-the-apis.html)
```
$ npx aws-api-gateway-cli-test
```

#### SETTING UP A REACT APP

18. [Create a New React.js App](https://serverless-stack.com/chapters/create-a-new-reactjs-app.html)

#### DEPLOYING A REACT APP ON AWS

19. [Deploy the Frontend](https://serverless-stack.com/chapters/deploy-the-frontend.html)
> Upload the assets of our app, Use a CDN to serve out our assets, Point our domain to the CDN distribution, Switch to HTTPS with a SSL certificate
- S3 to host our assets
- Cloud Front to serve assets
- Route 53 to manage our domain 
- Certificate Manager to handle SSL certificate

20. 
