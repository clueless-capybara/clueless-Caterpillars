'use strict';

const dynamoose = require('dynamoose');

const weatherSchema = new dynamoose.Schema({
  min_temp: String,
  max_temp: String,
  humidity: String,
  windSpeed: String,
  feelsLikeMax: String,
  feelsLikeMin: String,
  id: String
});

const weatherModel = dynamoose.model('Weather', weatherSchema);

exports.handler = async (event) => {
  console.log("Create Weather Event Object", event);
  let pathParameters = event.pathParameters;
  let responseBody = null;

  if (pathParameters && pathParameters.id) {
    console.log('REQUEST PATH PARAMS:', pathParameters);
    responseBody = await weatherModel.scan('id').eq(pathParameters.id).exec();
  } else {
    responseBody = await weatherModel.scan().exec();
  }
  console.log('WEATHER FROM OUR TABLE: ', responseBody);
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};
