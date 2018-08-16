import uuid from "uuid";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });
const comprehend = new AWS.Comprehend();

export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    LanguageCode: data.LanguageCode,
    Text: data.Text
  };

  comprehend.detectSentiment(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params)
    };

    console.log(data);

    callback(null, response);
  });
}
