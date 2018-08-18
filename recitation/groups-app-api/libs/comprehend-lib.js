import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

// export function call(action, params) {
//   const comprehend = new AWS.Comprehend();
//   AWS.Comprehend.Types()
//   return comprehend.detectSentiment(params);
// }

// export function call(action, params) {
//   comprehend.detectSentiment(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
// }

export async function call(action, params) {
  // var result = "";
  // comprehend.detectSentiment(params, function(err, data) {
  //   if (err) {
  //     console.log(err, err.stack);
  //     result = err;
  //   } else {
  //     console.log(data);
  //     result = data;
  //   }
  // });

  // console.log("this is result from lib" + result);
  // return result;
  getSentiment(params, function(result) {
    console.log("logging");
    console.log(result);
  });
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

// function foo(address, fn){
//   geocoder.geocode( { 'address': address}, function(results, status) {
//      fn(results[0].geometry.location);
//   });
// }

// foo("address", function(location){
//   alert(location); // this is where you get the return value
// });
