'use strict';

const credentials = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
};

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client();

async function getWeatherNow (){
  const input = { // GetObjectRequest
    Bucket: 'weather-data-capybara', // required
    Key: 'weather.json' // required
  
  };
  const response = await client.send(new GetObjectCommand(input));
  let weatherData = await response.Body.transformToString();
  weatherData = JSON.parse(weatherData)
  
  // console.log('weather data from getWeatherNow is ' + weatherData);
  return weatherData;
}

module.exports = getWeatherNow;
// getWeatherNow()