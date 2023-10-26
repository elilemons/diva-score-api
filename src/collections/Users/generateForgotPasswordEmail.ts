import generateEmailHTML from '../../email/generateEmailHTML'

const generateForgotPasswordEmail = async ({ token }): Promise<string> =>
  generateEmailHTML({
    headline: 'Reset your password',
    content:
      '<p>You are receiving this because you (or someone else) has requested to reset the password for your account.</p>',
    cta: {
      buttonLabel: 'Reset your password',
      url: `${process.env.PAYLOAD_PUBLIC_APP_URL}/uni/reset-password?token=${token}&accountType=buyers`,
    },
  })

export default generateForgotPasswordEmail
