'use strict';

const axios = require('axios');

const { cache } = require('./cache');

async function getWeeklyWeather(city){
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
      city: city,
      days: 5,
      key:process.env.WEATHERBIT_API_KEY,
    },
    method:'get',
  }

  try{
      let apiForecast = await axios(config);
      // console.log(apiForecast.data)
      weatherData['humidity'] = apiForecast.data.data[0].rh;
      weatherData['windspeed'] = apiForecast.data.data[0].wind_spd;
      weatherData['maxTemperature'] = apiForecast.data.data[0].max_temp;
      weatherData['minTemperature'] = apiForecast.data.data[0].min_temp;
      weatherData['feelsLikeMax'] = apiForecast.data.data[0].app_max_temp;
      weatherData['feelsLikeMin'] = apiForecast.data.data[0].app_min_temp;

  } catch (err){
    console.log(err)
    };

  // console.log(weatherData);
  return weatherData;
}

module.exports = getWeeklyWeather;