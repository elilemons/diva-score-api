import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'
import Surveys from '..'

export const getUsersSurveysEndpoint = async (
  req: PayloadRequest,
  res: Response,
  next?: NextFunction,
) => {
  const {
    query: { limit = 10 },
    payload,
    user,
  } = req

  if (!user) {
    return res.status(404).send('An authenticated user needs to be sent along with the request.')
  } else {
    try {
      // Find surveys where the survey user is the same as the user attached to the request
      const surveys = await payload.find({
        collection: Surveys.slug,
        where: {
          surveyUser: { equals: user.id },
        },
        limit: Number(limit),
      })

      return res.json(surveys)
    } catch (error) {
      next(error)
    }
  }
}
