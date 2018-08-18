import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";
AWS.config.update({ region: "us-east-1" });

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    LanguageCode: data.LanguageCode,
    Text: data.Text
  };

  try {
    getSentiment(params, function(result) {
      console.log("logging");
      console.log(result);

      if (result.Sentiment) {
        // Return the retrieved item
        console.log("Found");
        callback(null, success(result.Sentiment));
      } else {
        callback(
          null,
          failure({ status: false, error: "Sentiment not found." })
        );
      }
    });
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}

function getSentiment(params, fn) {
  var comprehend = new AWS.Comprehend({ apiVersion: "2017-11-27" });

  comprehend.detectSentiment(params, function(err, data) {
    if (err) {
      fn(err);
    } else {
      fn(data);
    }
  });
}
