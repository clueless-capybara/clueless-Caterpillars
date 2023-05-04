'use strict'

const { sendEmail, client } = require("./sendEmail")

client.send = jest.fn();
console.log = jest.fn();

describe('Testing send email functionality...', () => {

  test('Email is being sent', () => {
    sendEmail('test email being sent');
    expect(client.send).toHaveBeenCalled();
  })

  test('Recommendation is properly being passed in as email body', () => {
    sendEmail('test email being sent');
    expect(console.log).toHaveBeenCalledWith('Email successfully sent: ', 'test email being sent');
  })

})