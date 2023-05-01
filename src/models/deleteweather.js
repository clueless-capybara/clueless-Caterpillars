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
  console.log("Delete Weather Event Object", event);
  const response = {
    statusCode: 200,
    body: JSON.stringify('Delete Weather record')
  }

  const parameters = event.pathParameters;
  if (parameters && parameters.id) {
    console.log('REQUEST PATH PARAMS:', parameters);
    const result = await weatherModel.delete(parameters.id);
    console.log('DELETED WEATHER RECORD:', result);
  }
  
  return response;
};
