import { CollectionBeforeChangeHook } from 'payload/types'
import { getTodaysSurvey } from '../../../utils/getTodaysSurvey'
import QuestionSets from '../../QuestionSets'

const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
}) => {
  const { payload, user } = req

  if (!user) {
    throw new Error('An authenticated user must be sent along with the request.')
  }

  const todaysSurvey = await getTodaysSurvey(req)

  if (todaysSurvey) {
    throw new Error('You can only create one survey per day.')
  }

  if (operation === 'create') {
    try {
      const beforeChangeData = { ...data }

      beforeChangeData.surveyUser = user.id

      const dateString = new Date(beforeChangeData.surveyDate).toDateString()
      beforeChangeData.title = `${beforeChangeData.title} - ${dateString}`

      const activeQuestionSets = await payload.find({
        collection: QuestionSets.slug,
        where: {
          active: {
            equals: true,
          },
        },
      })

      if (activeQuestionSets && activeQuestionSets.totalDocs > 0) {
        beforeChangeData.surveyQuestionSets = activeQuestionSets.docs.map(
          (questionSet) => questionSet.id,
        )

        return beforeChangeData
      }

      throw new Error('No active question sets found.')
    } catch (error) {
      payload.logger.error(`There was an error setting up the survey: ${error}`)
      return false
    }
  }

  return data
}

export default beforeChangeHook
