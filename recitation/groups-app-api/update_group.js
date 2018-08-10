import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "groups",

    Key: {
      groupId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      "SET meetingNotes = :meetingNotes, attachment = :attachment, meetingLocation = :meetingLocation, attendanceLimit= :attendanceLimit, commentIds = :commentIds, participantIds = :participantIds, meetingTime = :meetingTime, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":attachment": data.attachment ? data.attachment : null,
      ":meetingNotes": data.meetingNotes ? data.meetingNotes : null,
      ":meetingTime": data.meetingTime ? data.meetingTime : null,
      ":meetingLocation": data.meetingLocation ? data.meetingLocation : null,
      ":attendanceLimit": data.attendanceLimit ? data.attendanceLimit : null,
      ":commentIds": data.commentIds ? data.commentIds : null,
      ":participantIds": data.participantIds ? data.participantIds : null,
      ":updatedAt": Date.now()
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    console.log(result);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
