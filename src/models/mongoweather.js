'use strict';

const mongoose = require('mongoose');

// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const weatherSchema = new mongoose.Schema({
  min_temp: String,
  max_temp: String,
  humidity: String,
  windSpeed: String,
  feelsLikeMax: String,
  feelsLikeMin: String,
  id: Number
});

const Weather = mongoose.model('Weather', weatherSchema);

exports.getWeather = async (event) => {
  console.log("Create Weather Event Object", event);
  let pathParameters = event.pathParameters;
  let responseBody = null;

  if (pathParameters && pathParameters.id) {
    console.log('REQUEST PATH PARAMS:', pathParameters);
    responseBody = await Weather.find({ id: pathParameters.id });
  } else {
    responseBody = await Weather.find();
  }
  console.log('WEATHER FROM OUR COLLECTION: ', responseBody);
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};

exports.deleteWeather = async (event) => {
  console.log("Delete Weather Event Object", event);
  const response = {
    statusCode: 200,
    body: JSON.stringify('Delete Weather record')
  }

  const parameters = event.pathParameters;
  if (parameters && parameters.id) {
    console.log('REQUEST PATH PARAMS:', parameters);
    const result = await Weather.deleteOne({ id: parameters.id });
    console.log('DELETED WEATHER RECORD:', result);
  }
  
  return response;
};

exports.updateWeather = async (event) => {
  console.log("Update Weather Event Object", event);
  let id = event.pathParameters.id;
  let parsedData = JSON.parse(event.body);
  let updatedMinTemp = parsedData.min_temp;
  let updatedMaxTemp = parsedData.max_temp;
  let updatedHumidity = parsedData.humidity;
  let updatedWindSpeed = parsedData.windSpeed;
  let responseBody = null;

  if (id) {
    console.log('REQUEST PATH PARAMS:', id);
    responseBody = await Weather.updateOne({ id: id }, { max_temp: updatedMaxTemp, min_temp: updatedMinTemp, humidity: updatedHumidity, windSpeed: updatedWindSpeed });
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };
  return response;
};

exports.addWeather = async (event) => {
  console.log("Create Weather Event Object", event);
  let parsedData = JSON.parse(event.body);
  let weatherData = new Weather({
    min_temp: parsedData.min_temp,
    max_temp: parsedData.max_temp,
    humidity: parsedData.humidity,
    windSpeed: parsedData.windSpeed,
    feelsLikeMax: parsedData.feelsLikeMax,
    feelsLikeMin: parsedData.feelsLikeMin,
    id: parsedData.id
  });
  let responseBody = await weatherData.save();
  console.log('WEATHER SAVED TO OUR COLLECTION: ', responseBody);
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};
