import AWS from "aws-sdk";

export async function detectSentiment(text) {
  const params = {
    region: "us-east-t",
    LanguageCode: "en",
    Text: text
  };

  console.log(text);

  var comprehend = new AWS.Comprehend();

  comprehend.detectSentiment(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  return null;
}
