'use strict';

// require('dotenv').config();
const axios = require('axios');

const NodeCache = require('node-cache');
const myCache = new NodeCache();

const getWeatherNow = require('./getWeatherNow')

async function getWeeklyWeather(city) {

// async function getWeeklyWeather(city = 'seattle') {

  //https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
  let config = {
    baseURL: 'http://api.weatherbit.io/v2.0/forecast/daily',
    params: {
      city: city,
      days: 5,
      units: 'I',
      key: process.env.WEATHERBIT_API_KEY,
    },
    method: 'get',
  }

  let weeklyWeather = [];
  // const key = city + 'Data';

  let cachedCities = myCache.keys();
  console.log(cachedCities);
  if (cachedCities.includes(city)) {
    console.log('Cache hit');
    let cachedCityResult = myCache.get(city);
    console.log(cachedCityResult);
    return cachedCityResult;
  }

  else {
    try {
      console.log('CACHE MISS')
      let apiForecast = await axios(config);
      // console.log(apiForecast.data)
      for (let idx = 0; idx < apiForecast.data.data.length; idx++) {
        let weatherData = {
          date: '',
          humidity: '',
          maxTemperature: '',
          minTemperature: '',
          windspeed: '',
          feelsLikeMax: '',
          feelsLikeMin: '',
        }
        weatherData['date'] = apiForecast.data.data[idx].valid_date;
        weatherData['humidity'] = apiForecast.data.data[idx].rh;
        weatherData['windspeed'] = apiForecast.data.data[idx].wind_spd;
        weatherData['maxTemperature'] = apiForecast.data.data[idx].max_temp;
        weatherData['minTemperature'] = apiForecast.data.data[idx].min_temp;
        weatherData['feelsLikeMax'] = apiForecast.data.data[idx].app_max_temp;
        weatherData['feelsLikeMin'] = apiForecast.data.data[idx].app_min_temp;
        weeklyWeather.push(weatherData);
      }

      myCache.set(city, weeklyWeather, 86400000);
      console.log(myCache.data);


      // cache[key] = {};
      // cache[key].timestamp = Date.now();
      // cache[key].data = weeklyWeather;
    }
    catch (err) {
      console.log(err.data);
      weeklyWeather = await getWeatherNow();
    };
  }
  console.log(weeklyWeather);
  return weeklyWeather;
}

module.exports = getWeeklyWeather;
// getWeeklyWeather();