'use strict'

require('dotenv').config();

const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");

const client = new SESv2Client({ region: "us-west-2" });

const sendEmail = async (reccomendation) => {

  const input = { // SendEmailRequest
    FromEmailAddress: process.env.AWS_EMAIL_ADDRESS,
    FromEmailAddressIdentityArn: process.env.AWS_EMAIL_ARN,
    Destination: { // Destination
      ToAddresses: [ // EmailAddressList
            process.env.TEST_EMAIL
      ],
    },
    ReplyToAddresses: [
      process.env.AWS_EMAIL_ADDRESS,
    ],
    FeedbackForwardingEmailAddress: process.env.AWS_EMAIL_ADDRESS,
    FeedbackForwardingEmailAddressIdentityArn: process.env.AWS_EMAIL_ARN,
    Content: { // EmailContent
      Simple: { // Message
        Subject: { // Content
          Data: "Your Clothing Recommendation from Clueless Caterpillar!", // required
          Charset: "utf-8",
        },
        Body: { // Body
          Text: {
            Data: reccomendation, // required
            Charset: "utf-8",
          },
        },
      },
    },
  };
  
  const command = new SendEmailCommand(input);

  try {
    const response = await client.send(command);
    console.log(`EMAIL SUCCESSFULLY SENT: `, reccomendation);
  }
  catch (err) {
    console.log('ERROR SENDING EMAIL: ', err)
    throw new Error('Could not send email')
  }
}

// sendEmail();

module.exports = {
  sendEmail,
  client
}