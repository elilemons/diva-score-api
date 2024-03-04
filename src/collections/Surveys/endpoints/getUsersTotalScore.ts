import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'
import Surveys from '..'
import { Survey } from '@elilemons/diva-score-lib'

export const getUsersTotalScoreEndpoint = async (
  req: PayloadRequest,
  res: Response,
  next?: NextFunction,
) => {
  const { payload, user } = req

  if (!user) {
    return res.status(404).send('An authenticated user needs to be sent along with the request.')
  } else {
    try {
      // Find surveys where the survey user is the same as the user attached to the request
      const surveys = (await payload
        .find({
          collection: Surveys.slug,
          where: {
            surveyUser: { equals: user.id },
          },
        })
        .then((res) => res.docs)) as Survey[]

      const totalScore = surveys.reduce((acc, survey) => acc + survey.pointsEarned, 0)

      return res.json({ totalScore })
    } catch (error) {
      next(error)
    }
  }
}
