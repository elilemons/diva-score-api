import { PayloadRequest } from 'payload/types'
import Surveys from '../collections/Surveys'

export const getTodaysSurvey = async (req: PayloadRequest) => {
  const { payload, user } = req
  const today = new Date(Date.now()).setHours(0, 0, 0, 0)

  // As this collection is sorted by most recent surveyDate,
  // we only need to grab the latest to see if it is todays
  const usersSurveys = await payload.find({
    collection: Surveys.slug,
    limit: 1,
    where: {
      and: [
        {
          surveyUser: {
            equals: user.id,
          },
        },
      ],
    },
  })

  if (usersSurveys.totalDocs > 0) {
    return usersSurveys.docs.find(
      (survey) =>
        typeof survey.surveyDate === 'string' &&
        new Date(survey.surveyDate).setHours(0, 0, 0, 0) === today,
    )
  }
}
