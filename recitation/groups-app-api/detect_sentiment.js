import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });
const comprehend = new AWS.Comprehend({ apiVersion: "2017-11-27" });

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    LanguageCode: data.LanguageCode,
    // LanguageCode: "nz",
    Text: data.Text
  };

  comprehend.detectSentiment(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (error) {
      // console.log(error);
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    // console.log(data);
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(data)
    };
    callback(null, response);
  });
}
