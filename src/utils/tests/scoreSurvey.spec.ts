import { Admin, QuestionBlock, QuestionSet, Survey, UserOnRequest } from '@elilemons/diva-score-lib'
import { createQuestionSets, createSurvey, deleteSurvey, getAdmin } from '../../tests/helpers'
import { answerQuestion } from '../answerQuestion'
import { scoreSurvey } from '../scoreSurvey'

describe('Score Survey', () => {
  let admin: UserOnRequest<Admin>
  let adminToken: string
  let headers: Headers
  let surveyToScore: Survey

  beforeAll(async () => {
    admin = await getAdmin()
    adminToken = admin.token
    headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `JWT ${adminToken}`,
    })
    surveyToScore = await createQuestionSets(headers).then(
      async () => await createSurvey({ headers }).then((res) => res.doc),
    )
  })

  afterAll(async () => {
    if (surveyToScore && surveyToScore && surveyToScore.id) {
      await deleteSurvey({ surveyId: surveyToScore.id, headers })
    }
  })

  it('should get the best score possible', async () => {
    const answeredSurvey = JSON.parse(JSON.stringify(surveyToScore))

    answeredSurvey.surveyQuestionSets.map((qs: QuestionSet) => {
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

    const result = await scoreSurvey(answeredSurvey)

    expect(result).toEqual({ score: 9 })
  })

  it('should get 6 points', async () => {
    const answeredSurvey = JSON.parse(JSON.stringify(surveyToScore))

    const mindQuestionSet = answeredSurvey.surveyQuestionSets.find(
      (qs: QuestionSet) => qs.title === 'Mind',
    ) as QuestionSet
    mindQuestionSet.questions[0] = answerQuestion({
      question: mindQuestionSet.questions[0],
      answerValue: true,
    })

    const goalQuestionSet = answeredSurvey.surveyQuestionSets.find(
      (qs: QuestionSet) => qs.title === 'Goals',
    ) as QuestionSet
    goalQuestionSet.questions[1] = answerQuestion({
      question: goalQuestionSet.questions[1],
      answerValue: true,
    })

    const mindIndex = answeredSurvey.surveyQuestionSets.findIndex(
      (qs: QuestionSet) => qs.title === 'Mind',
    )
    answeredSurvey[mindIndex] = mindQuestionSet

    const goalIndex = answeredSurvey.surveyQuestionSets.findIndex(
      (qs: QuestionSet) => qs.title === 'Goals',
    )
    answeredSurvey[goalIndex] = goalQuestionSet

    const result = await scoreSurvey(answeredSurvey)

    expect(result).toEqual({ score: 6 })
  })

  it('should not get any points', async () => {
    const answeredSurvey = JSON.parse(JSON.stringify(surveyToScore))

    const result = await scoreSurvey(answeredSurvey)
    expect(result).toEqual({ score: 0 })
  })
})
