import { QuestionBlock, QuestionSet, Survey } from '@elilemons/diva-score-lib'
import { CollectionBeforeChangeHook } from 'payload/types'
import { answerQuestion } from '../../../utils/answerQuestion'
import { getTodaysSurvey } from '../../../utils/getTodaysSurvey'
import { scoreSurvey } from '../../../utils/scoreSurvey'
import QuestionSets from '../../QuestionSets'

const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
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
    // beforeChangeData will look like { body1: true, body2: true }
    // TODO Remove this test code
    console.log('ELITEST update survey called', { beforeChangeData })
    // ^ TODO Remove this test code
    try {
      beforeChangeData.surveyQuestionSets.map((qs: QuestionSet) => {
        qs.questions.map((q: QuestionBlock) => {
          switch (q.questionTextFields.answer[0].blockType) {
            case 'answerCheckboxBlock':
              return answerQuestion({
                question: q,
                answerValue: true,
              })
            case 'answerTextBlock' || 'answerRichTextBlock':
              return answerQuestion({
                question: q,
                answerValue: 'true',
              })
            default:
              break
          }
        })
      })

      const score = await scoreSurvey(beforeChangeData as Survey).then((score) => score)
      // TODO Remove this test code
      console.log('ELITEST score', { score })
      // ^ TODO Remove this test code

      beforeChangeData.pointsEarned = score

      return beforeChangeData
    } catch (error) {
      payload.logger.error(`There was an error updating the survey: ${error}`)
      return false
    }
  }

  return data
}

export default beforeChangeHook
