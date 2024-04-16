import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'
import Surveys from '..'
import { AnswerCheckboxBlock, QuestionSet, Survey } from '@elilemons/diva-score-lib'

export const getTotalGoalsMet = async (req: PayloadRequest, res: Response, next?: NextFunction) => {
  const { payload, user } = req

  if (!user) {
    return res.status(404).send('An authenticated user needs to be sent along with the request.')
  } else if (user && user.collection !== 'admins') {
    return res.status(403).send('This user is not authorized to view this request.')
  } else {
    try {
      // Find surveys where the survey user is the same as the user attached to the request
      const surveys = (await payload
        .find({
          collection: Surveys.slug,
          limit: Number.MAX_SAFE_INTEGER,
        })
        .then((res) => res.docs)) as Survey[]

      const totalGoals = surveys.filter((survey) => {
        const goalsQuestionSet = survey.surveyQuestionSets.find(
          (qs: QuestionSet) => qs.title === 'Goals',
        ) as QuestionSet

        const answer = goalsQuestionSet.questions[0].questionTextFields
          .answer[0] as AnswerCheckboxBlock

        if (
          answer &&
          answer.answerCheckboxFields &&
          answer.answerCheckboxFields.answerCheckboxValue
        ) {
          return answer.answerCheckboxFields.answerCheckboxValue === true
        }
      })

      return res.json({ totalGoals: totalGoals.length })
    } catch (error) {
      next(error)
    }
  }
}
