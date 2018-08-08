import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "classGroups",
    Item: {
      classGroupId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      meetingLocation: data.meetingLocation,
      notes: data.notes,
      meetingTime: data.meetingTime,
      attendanceLimit: data.attendanceLimit,
      participantIds: data.participantIds,
      commentIds: data.commentIds,
      attachment: data.attachment,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);

    callback(null, failure({ status: false }));
  }
}
