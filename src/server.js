'use strict'

require('dotenv').config();
const handleError = require('./errorhandlers/500');
const handleNotFound = require('./errorhandlers/400');

// const getWeatherAndEvents = require('./getWeatherAndEvents');
const getWeatherNow = require('./getWeatherNow');
const {handleSMS, sendCurrentWeatherSMS} = require('./handleSMS')
const getClothesNow = require('./getClothesNow');
const dbModel = require('./database/model');
const Data = require('./models/mongoweather')

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
  console.log('Mongoose is connected')
);
// const prompt = require('prompt-sync')();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/getClothes', async (req, res, next) => {
  try {
    let sentMessages = await handleSMS();
    res.status(200).send('recommendations sent to user devices');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get('/getClothesNow', async (req, res, next) => {
  try {
    await sendCurrentWeatherSMS();
    res.status(200).send('recommendations for current weather sent to user devices');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post('/recomendation', (req, res, next) => {
  console.log(req.body);
  dbModel.create(req.body)
    .then(data => {
      console.log('successfully added to db')
      res.status(202).send(data)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.get('/', (request, response, next) => {
  response.status(200).send('Beanstalk Climbed! Great Job!');
});

app.post(Data.addWeather);
app.delete(Data.deleteWeather);
app.put(Data.updateWeather);

app.get('/', (req, res, next) => {
  res.send('Server Live');
});

app.use('*', handleNotFound);
app.use(handleError);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on port ${port}`));
  },
};
