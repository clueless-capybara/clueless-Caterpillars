'use strict';

const axios = require('axios');
const prompt = require('prompt-sync')();
const readline = require("readline");
const rl =
 readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const { cache } = require('./cache');

async function getWeeklyWeather(req, res, next){
  //https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
  let weatherData = {
    humidity: '',
    maxTemperature: '',
    minTemperature: '',
    windspeed: '',
    feelsLikeMax: '',
    feelsLikeMin:'',
  }
  let config = {
    baseURL: 'http://api.weatherbit.io/v2.0/forecast/daily',
    params: {
      key:process.env.WEATHERBIT_API_KEY,
      city: 'Seattle',
      days: 5,
    },
    method:'get',
  }

  try{
      let apiForecast = await axios(config);
      console.log(apiForecast.data)
      weatherData['humidity'] = apiForecast.data.data[0].rh;
      weatherData['windspeed'] = apiForecast.data.data[0].wind_spd;
      weatherData['maxTemperature'] = apiForecast.data.data[0].max_temp;
      weatherData['minTemperature'] = apiForecast.data.data[0].min_temp;
      weatherData['feelsLikeMax'] = apiForecast.data.data[0].app_max_temp;
      weatherData['feelsLikeMin'] = apiForecast.data.data[0].app_min_temp;

  } catch (err){
    console.log(err)
    };

  console.log('getWeeklyWeather returns weatherData as ' + weatherData);
  return weatherData;
}

module.exports = weatherAPI;
