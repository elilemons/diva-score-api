import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'
import { getTodaysSurvey } from '../../../utils/getTodaysSurvey'

export const getTodaysSurveyEndpoint = async (
  req: PayloadRequest,
  res?: Response,
  next?: NextFunction,
) => {
  const { user } = req

  if (!user) {
    return res.status(404).send('An authenticated user needs to be sent along with the request.')
  } else {
    try {
      await getTodaysSurvey(req).then((survey) => {
        if (survey) {
          return res.status(200).send({ id: survey.id })
        } else {
          return res.status(200).send({ id: undefined })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
