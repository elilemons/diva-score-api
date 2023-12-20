import { Survey } from '@elilemons/diva-score-lib'
import { CollectionBeforeChangeHook } from 'payload/types'
import Surveys from '..'
import { answerSurvey } from '../../../utils/answerSurvey'
import { getTodaysSurvey } from '../../../utils/getTodaysSurvey'
import { scoreSurvey } from '../../../utils/scoreSurvey'
import QuestionSets from '../../QuestionSets'

const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc,
}) => {
  const { payload, user } = req
  const beforeChangeData = { ...data }

  if (!user) {
    throw new Error('An authenticated user must be sent along with the request.')
  }

  if (operation === 'create') {
    const todaysSurvey = await getTodaysSurvey(req)

    if (todaysSurvey) {
      throw new Error('You can only create one survey per day.')
    }

    try {
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

  if (operation === 'update') {
    try {
      const currentSurvey = (await payload.findByID({
        collection: Surveys.slug,
        id: originalDoc.id,
        depth: 4,
      })) as Partial<Survey>

      const answeredSurvey = await answerSurvey({
        survey: currentSurvey,
        answers: beforeChangeData,
      })

      const score = await scoreSurvey(answeredSurvey as Survey).then((res) => res.score)
      answeredSurvey.pointsEarned = score
      answeredSurvey.surveyUser = user.id

      return answeredSurvey
    } catch (error) {
      payload.logger.error(`There was an error updating the survey: ${error}`)
      return false
    }
  }

  return data
}

export default beforeChangeHook
