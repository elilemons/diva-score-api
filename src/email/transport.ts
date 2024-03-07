import sgTransport from 'nodemailer-sendgrid'

require('dotenv').config() // eslint-disable-line

let email // eslint-disable-line

if (process.env.SENDGRID_API_KEY) {
  const options = {
    apiKey: process.env.SENDGRID_API_KEY,
  }

  email = {
    transportOptions: sgTransport(options),
    fromName: 'DIVA Score App',
    fromAddress: 'info@divascore.app',
  }
}

export default email
