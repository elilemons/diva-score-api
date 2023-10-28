import generateEmailHTML from '../../email/generateEmailHTML'

const generateVerifyEmail = async ({ token }): Promise<string> =>
  generateEmailHTML({
    headline: 'Verify your Email',
    content:
      '<p>You are receiving this because you (or someone else) has requested to reset the password for your account.</p>',
    cta: {
      buttonLabel: 'Verify your Email',
      url: `${process.env.PAYLOAD_PUBLIC_APP_URL}/uni/verify?token=${token}`,
    },
  })

export default generateVerifyEmail
