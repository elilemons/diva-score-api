import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'
import { scoreQuestionSet } from '../../../utils/scoreQuestionSet'

export const scoreQuestionSetEndpoint = async (
  req: PayloadRequest,
  res?: Response,
  next?: NextFunction,
) => {
  const {
    body: { questionSet },
    user,
  } = req

  if (!user) {
    return res.status(404).send('An authenticated user needs to be sent along with the request.')
  } else {
    try {
      await scoreQuestionSet(questionSet).then((score) => {
        if (score) {
          return res.status(200).send(score)
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
