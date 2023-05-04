'use strict';

require('dotenv').config();

// const getWeatherAndEvents = require('./../getWeatherAndEvents')

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;  

async function sendSMS(text, fromNumber, toNumber, accountSid, authToken)   {
  const client = require('twilio')(accountSid, authToken);
  let body = "";
  
  await client.messages
  .create({
    body: text,
    from: fromNumber,
    to: toNumber
  })
  .then(message => {
    console.log(message.sid);
    console.log(message.body);
    body = message.body;
  });

  return body;
}

module.exports = sendSMS;
