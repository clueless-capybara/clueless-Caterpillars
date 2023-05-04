'use strict'

require('dotenv').config();
const handleError = require('./errorhandlers/500');
const handleNotFound = require('./errorhandlers/400');
const sendSMS = require('./sms/sms_sends');
const sendEmail = require('./email/sendEmail')
const getWeatherAndEvents = require('./getWeatherAndEvents');
const getWeatherNow = require('./getWeatherNow');
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

const handleSMS = async () => {

  // for testing, save money for text-messages
  let result = await getWeatherAndEvents();
  console.log('SMS handled');
  return result;


  let text = await getWeatherAndEvents();
  sendSMS(text);
  sendEmail(text);

  if (typeof(text) !== 'string'){
    dbModel.create(
      {
        email: process.env.TEST_EMAIL,
        message: text,
      }
    )
  }
  else {
    dbModel.create({
      email: process.env.TEST_EMAIL,
      message: 'It\s room temperature, under standard pressure, wear a light jacket'
    })
  }
}

app.get('/getClothes', async (req, res, next) => {
  try {
    let sentMessages = await handleSMS();
    res.status(200).send('recommendations sent to user devices');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post('/recommendation', (req, res, next) => {
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
