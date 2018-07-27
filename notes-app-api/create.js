import uuid from "uuid";
import AWS from "aws-sdk";
import { AssertionError } from "assert";

AWS.config.update({region: "us-east-1"});
const dynamoDb = new AWS.DynamoDB.DocumentClient();


