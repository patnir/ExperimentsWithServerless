import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "groups",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      groupId: uuid.v1(),

      content: data.content,
      attachment: data.attachment,

      createdAt: Date.now(),
      updatedAt: Date.now(),

      commentIds: data.commentIds,
      participantIds: data.participantIds,
      attendanceLimit: data.attendanceLimit,

      meetingTime: data.meetingTime,
      meetingLocation: data.meetingLocation,
      meetingNotes: data.meetingNotes
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
