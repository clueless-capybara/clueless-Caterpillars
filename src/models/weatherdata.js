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
  const response = {
    statusCode: 500,
    body: JSON.stringify('Create Weather Error')
  }

  if (event.body) {
    response.body = JSON.stringify('Adding Weather record');
  } else {
    response.body = JSON.stringify('Missing request body');
  }
  return response;
};
