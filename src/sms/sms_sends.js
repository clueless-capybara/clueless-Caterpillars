'use strict';

require('dotenv').config();

async function sendSMS(text, fromNumber, toNumber, sid, token) {
  const accountSid = sid;
  const authToken = token;
  const client = require('twilio')(accountSid, authToken);
  let body;
  await client.messages
    .create({
      body: text,
      from: `+${fromNumber}`,
      to: `+${toNumber}`
    })
    .then(message => {
      body = message.body
      console.log('MESSAGE ', message.body)
    });
  console.log(body);
  return body;
}

module.exports = sendSMS;
