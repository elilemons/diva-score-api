import { NextFunction, Response } from 'express'
import payload from 'payload'
import { PayloadRequest } from 'payload/types'
import Users from '..'

/**
 * Generates a forgotten password token for the passed in user.
 * User must be authenticated.
 * @param req
 * @param res
 * @returns
 */
const generateForgotPasswordToken = async (
  req: PayloadRequest,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req

  if (!user) {
    return res.status(404).send('An authenticated user needs to be sent along with the request.')
  } else {
    const exp = new Date(Date.now())
    exp.setMonth(exp.getMonth() + 3)

    try {
      const forgotPasswordToken = await payload.forgotPassword({
        collection: Users.slug,
        disableEmail: true,
        expiration: exp.getTime(),
        data: {
          email: user.email,
        },
        req,
      })

      return res.status(200).send({ token: forgotPasswordToken })
    } catch (error) {
      next(error)
    }
  }
}
export default generateForgotPasswordToken
