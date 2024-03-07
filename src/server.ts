import express from 'express'
import payload from 'payload'
import email from './email/transport'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    email,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      payload.logger.info(`Payload UI URL: ${process.env.PAYLOAD_PUBLIC_APP_URL}`)
    },
  })

  // Add your own express routes here

  app.listen(process.env.PORT)
}

start()
