## Miscellaneous notes and frequently used resources

Node and NPM version checks: 
	node -v
	npm -v

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




