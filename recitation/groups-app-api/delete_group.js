import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "groups",
    Key: {
      groupId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    callback(null, success({ status: true }));
    console.log(result);
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
