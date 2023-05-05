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

  test('2. Get data from Weatherbit API', async ()=>{
    let result = await getWeeklyWeather('seattle');
    let errResult = await getWeeklyWeather('') //error expected
    console.log(result)
    expect(result.length).toBeTruthy();
    expect(errResult['humidity']).toBeTruthy();
  });

  test('3. Get cached data from Weatherbit API if not expired', async ()=>{
    console.log = jest.fn();
    await getWeeklyWeather('seattle');
    expect(console.log).toHaveBeenCalledWith('Cache hit');
  });

  test('3. Get clothes recommendations with a valid temperature or event', ()=>{
    expect(getClothesByTemp(86).length).toBeTruthy();
    expect(getClothesByTemp(100)).toEqual(getClothesByTemp(90));
    expect(getClothesByTemp(10)).toBeTruthy();
    expect(getClothesByEvent('wedding').length).toBeTruthy();
    expect(getClothesByEvent('not-an-event')).not.toBeTruthy();
  });

})