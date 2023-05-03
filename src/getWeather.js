'use strict';

// require('dotenv').config();
const axios = require('axios');

const { cache } = require('./cache');

async function getWeeklyWeather(city='seattle'){
  //https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

  let config = {
    baseURL: 'http://api.weatherbit.io/v2.0/forecast/daily',
    params: {
      city: city,
      days: 5,
      units: 'I',
      key:process.env.WEATHERBIT_API_KEY,
    },
    method:'get',
  }

  let weeklyWeather = [];
  try{
      let apiForecast = await axios(config);
      // console.log(apiForecast.data)
      for (let idx=0; idx < apiForecast.data.data.length; idx++ ){
        let weatherData = {
          date: '',
          humidity: '',
          maxTemperature: '',
          minTemperature: '',
          windspeed: '',
          feelsLikeMax: '',
          feelsLikeMin:'',
        }

        weatherData['date']=apiForecast.data.data[idx].valid_date;
        weatherData['humidity'] = apiForecast.data.data[idx].rh;
        weatherData['windspeed'] = apiForecast.data.data[idx].wind_spd;
        weatherData['maxTemperature'] = apiForecast.data.data[idx].max_temp;
        weatherData['minTemperature'] = apiForecast.data.data[idx].min_temp;
        weatherData['feelsLikeMax'] = apiForecast.data.data[idx].app_max_temp;
        weatherData['feelsLikeMin'] = apiForecast.data.data[idx].app_min_temp;
        weeklyWeather.push(weatherData);
      }
        
  } catch (err){
    console.log(err);
    };

  console.log(weeklyWeather);
  return weeklyWeather;
}

module.exports = getWeeklyWeather;
// getWeeklyWeather();