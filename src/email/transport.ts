import sgTransport from 'nodemailer-sendgrid'

require('dotenv').config() // eslint-disable-line

let email // eslint-disable-line
// TODO

if (process.env.SENDGRID_API_KEY) {
  const options = {
    apiKey: process.env.SENDGRID_API_KEY,
  }

  email = {
    transportOptions: sgTransport(options),
    fromName: 'No Reply DIVA Score',
    fromAddress: 'no-reply@divascore.app',
  }
}

export default email
