'use strict';

require('dotenv').config();
const getWeatherNow = require('../src/getWeatherNow');
const getWeeklyWeather = require('../src/getWeather');
const { getClothesByEvent, getClothesByTemp } = require('../src/getClothes')

describe('Should return an object with temperature, humidity, and timeStamp', ()=>{
  test('1. Get data from S3: return most recent temperature and humidity reading', async ()=>{
    let result = await getWeatherNow();
    expect(result.temperature).toBeTruthy();
    expect(result.humidity).toBeTruthy();
    expect(result.timeStamp).toBeTruthy();
  });

  xtest('2. Get data from Weatherbit API', async ()=>{
    let result = await getWeeklyWeather('seattle');
    let errResult = await getWeeklyWeather('')
    console.log(result)
    expect(result.length).toBeTruthy();
    expect(errResult.length).toEqual(0);
  });

  test('3. Get clothes recommendations with a valid temperature', ()=>{
    expect(getClothesByTemp(86).length).toBeTruthy();
    expect(getClothesByTemp(100)).toEqual(getClothesByTemp(90));
    expect(getClothesByTemp(10)).toBeTruthy();
    expect(getClothesByEvent('wedding').length).toBeTruthy();
    expect(getClothesByEvent('not-an-event')).not.toBeTruthy();
  });
})