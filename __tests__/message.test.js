
'use strict';

require('dotenv').config();
const sendSMS = require('../src/sms/sms_sends');

const testSid = process.env.TWILIO_TEST_SID;
const testToken = process.env.TWILIO_TEST_TOKEN;
const testNum = process.env.TWILIO_TEST_NUMBER;
const recNum = process.env.RECIPIENT_PHONE_NUMBER;

describe('test SMS module', () => {

  test('send message with test credentials', async () => {
    const testMessage = "caterpillar says wear pants";
    const msgReturn = await sendSMS(testMessage, testNum, recNum, testSid, testToken);
    console.log(msgReturn);
    expect(msgReturn).toStrictEqual("caterpillar says wear pants");
  });

});