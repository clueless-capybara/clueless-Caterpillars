'use strict';

require('dotenv').config();

// const getWeatherAndEvents = require('./../getWeatherAndEvents')

function sendSMS(text)   {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;  
  const client = require('twilio')(accountSid, authToken);

  client.messages
  .create({
    body: text,
    from: `+${process.env.TWILIO_PHONE_NUMBER}`,
    to: `+${process.env.RECIPIENT_PHONE_NUMBER}`
  })
  .then(message => console.log(message.sid));
}

module.exports = sendSMS;
