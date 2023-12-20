import { Admin, Doc, QuestionSet, Survey, UserOnRequest } from '@elilemons/diva-score-lib'
import { createQuestionSets, createSurvey, deleteSurvey, getAdmin } from '../../tests/helpers'
import { answerSurvey } from '../answerSurvey'

describe('Answer Survey', () => {
  let admin: UserOnRequest<Admin>
  let adminToken: string
  let headers: Headers
  let testSurvey: Doc<Survey>

  beforeAll(async () => {
    admin = await getAdmin()
    adminToken = admin.token
    headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `JWT ${adminToken}`,
    })
    testSurvey = await createQuestionSets(headers).then(async () => await createSurvey({ headers }))
  })

  afterAll(async () => {
    if (testSurvey && testSurvey.doc && testSurvey.doc.id) {
      await deleteSurvey({ surveyId: testSurvey.doc.id, headers })
    }
  })

  it('should test answering a survey with no answers', async () => {
    const mockAnswers = {
      body1: false,
      body2: false,
      mind1: false,
      spirit1: '',
      connection1: false,
      goals1: '',
      goals2: false,
    }

    const answeredSurvey = await answerSurvey({
      survey: testSurvey.doc,
      answers: mockAnswers,
    })

    const questionKeys = Object.keys(mockAnswers)
    const questionSetKeys = questionKeys.map((questionKey) => questionKey.replace(/\d+/g, ''))

    questionSetKeys.forEach((qsk) => {
      const questionSet = answeredSurvey.surveyQuestionSets.find(
        (qs: QuestionSet) => qs.title.toLowerCase() === qsk,
      ) as QuestionSet

      questionSet.questions.forEach((q, index) => {
        const key = `${questionSet.title.toLowerCase()}${index + 1}`
        switch (q.questionTextFields.answer[0].blockType) {
          case 'answerCheckboxBlock':
            expect(q.questionTextFields.answer[0].answerCheckboxFields.answerCheckboxValue).toEqual(
              mockAnswers[key],
            )
            break
          case 'answerTextBlock':
            expect(q.questionTextFields.answer[0].answerTextFields.answerTextValue).toEqual(
              mockAnswers[key],
            )
            break

          case 'answerRichTextBlock':
            expect(q.questionTextFields.answer[0].answerRichTextFields.answerRichTextValue).toEqual(
              mockAnswers[key],
            )
            break

          default:
            break
        }
      })
    })
  })

  it('should test answering a survey with all the answers', async () => {
    const mockAnswers = {
      body1: true,
      body2: true,
      mind1: true,
      spirit1: 'I am grateful for my cat',
      connection1: true,
      goals1: 'My goal today was to floss my teeth when I woke up',
      goals2: true,
    }

    const answeredSurvey = await answerSurvey({
      survey: testSurvey.doc,
      answers: mockAnswers,
    })

    const questionKeys = Object.keys(mockAnswers)
    const questionSetKeys = questionKeys.map((questionKey) => questionKey.replace(/\d+/g, ''))

    questionSetKeys.forEach((qsk) => {
      const questionSet = answeredSurvey.surveyQuestionSets.find(
        (qs: QuestionSet) => qs.title.toLowerCase() === qsk,
      ) as QuestionSet

      questionSet.questions.forEach((q, index) => {
        const key = `${questionSet.title.toLowerCase()}${index + 1}`
        switch (q.questionTextFields.answer[0].blockType) {
          case 'answerCheckboxBlock':
            expect(q.questionTextFields.answer[0].answerCheckboxFields.answerCheckboxValue).toEqual(
              mockAnswers[key],
            )
            break
          case 'answerTextBlock':
            expect(q.questionTextFields.answer[0].answerTextFields.answerTextValue).toEqual(
              mockAnswers[key],
            )
            break

          case 'answerRichTextBlock':
            expect(q.questionTextFields.answer[0].answerRichTextFields.answerRichTextValue).toEqual(
              mockAnswers[key],
            )
            break

          default:
            break
        }
      })
    })
  })

  it('should test answering a survey with a mix of answers', async () => {
    const mockAnswers = {
      body1: true,
      body2: false,
      mind1: true,
      spirit1: '',
      connection1: true,
      goals1: '',
      goals2: true,
    }

    const answeredSurvey = await answerSurvey({
      survey: testSurvey.doc,
      answers: mockAnswers,
    })

    const questionKeys = Object.keys(mockAnswers)
    const questionSetKeys = questionKeys.map((questionKey) => questionKey.replace(/\d+/g, ''))

    questionSetKeys.forEach((qsk) => {
      const questionSet = answeredSurvey.surveyQuestionSets.find(
        (qs: QuestionSet) => qs.title.toLowerCase() === qsk,
      ) as QuestionSet

      questionSet.questions.forEach((q, index) => {
        const key = `${questionSet.title.toLowerCase()}${index + 1}`
        switch (q.questionTextFields.answer[0].blockType) {
          case 'answerCheckboxBlock':
            expect(q.questionTextFields.answer[0].answerCheckboxFields.answerCheckboxValue).toEqual(
              mockAnswers[key],
            )
            break
          case 'answerTextBlock':
            expect(q.questionTextFields.answer[0].answerTextFields.answerTextValue).toEqual(
              mockAnswers[key],
            )
            break

          case 'answerRichTextBlock':
            expect(q.questionTextFields.answer[0].answerRichTextFields.answerRichTextValue).toEqual(
              mockAnswers[key],
            )
            break

          default:
            break
        }
      })
    })
  })
})
