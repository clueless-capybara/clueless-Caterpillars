'use strict'

require('dotenv').config();

const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");

const client = new SESv2Client({ region: "us-west-2" });

const sendEmail = async (emailBody, title ='Clueless Caterpillar\s Recommendation') => {
const input = { // SendEmailRequest
  FromEmailAddress: process.env.AWS_EMAIL_ADDRESS,
  FromEmailAddressIdentityArn: process.env.AWS_EMAIL_ARN,
  Destination: { // Destination
    ToAddresses: [ // EmailAddressList
      // "kmillerartwork@gmail.com",
      process.env.TEST_EMAIL
    ],
    // CcAddresses: [
    //   "STRING_VALUE",
    // ],
    // BccAddresses: [
    //   "STRING_VALUE",
    // ],
  },
  ReplyToAddresses: [
    process.env.AWS_EMAIL_ADDRESS,
  ],
  FeedbackForwardingEmailAddress: process.env.AWS_EMAIL_ADDRESS,
  FeedbackForwardingEmailAddressIdentityArn: process.env.AWS_EMAIL_ARN,
  Content: { // EmailContent
    Simple: { // Message
      Subject: { // Content
        Data: title, // required
        Charset: "utf-8",
      },
      Body: { // Body
        Text: {
          Data: emailBody, // required
          Charset: "utf-8",
        },
      },
    },
  },
};

  const command = new SendEmailCommand(input);
  try {
    const response = await client.send(command);
    console.log(response);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = sendEmail;

