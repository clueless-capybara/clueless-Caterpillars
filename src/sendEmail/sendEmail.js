'use strict'

require('dotenv').config();

const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");

const client = new SESv2Client({ region: "us-west-2" });

const input = { // SendEmailRequest
  FromEmailAddress: process.env.AWS_EMAIL_ADDRESS,
  FromEmailAddressIdentityArn: process.env.AWS_EMAIL_ARN,
  Destination: { // Destination
    ToAddresses: [ // EmailAddressList
      "kmillerartwork@gmail.com",
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
        Data: "Test Email From Node", // required
        Charset: "utf-8",
      },
      Body: { // Body
        Text: {
          Data: "omg wow this is a test email from your node app very cool", // required
          Charset: "utf-8",
        },
      },
    },
  },
};

const command = new SendEmailCommand(input);


const sendEmail = async () => {
  try {
    const response = await client.send(command);
    console.log(response);
  }
  catch (err) {
    console.log(err)
  }
}

sendEmail();
