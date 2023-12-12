import { AnswerCheckboxBlock, UserOnRequest } from '@elilemons/diva-score-lib'
import { Admin, AnswerTextBlock } from 'payload/generated-types'
import QuestionSets from '..'
// import QuestionSets from '..'
import { getAdmin } from '../../../tests/helpers'
import { mockQuestionSets } from './mock'

describe('Question Sets', () => {
  let admin: UserOnRequest<Admin>
  let adminToken: string
  let headers: Headers

  beforeAll(async () => {
    admin = await getAdmin()
    adminToken = admin.token
    headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `JWT ${adminToken}`,
    })
  })

  describe('should test scoring a question set', () => {
    it('should score 1', async () => {
      const mockQuestionSet = { ...mockQuestionSets[0] }

      const answerOne = mockQuestionSet.questions[0].questionTextFields
        .answer[0] as AnswerCheckboxBlock
      answerOne.answerCheckboxFields.answerCheckboxValue = true

      const answerTwo = mockQuestionSet.questions[1].questionTextFields
        .answer[0] as AnswerCheckboxBlock
      answerTwo.answerCheckboxFields.answerCheckboxValue = true

      mockQuestionSet.questions[0].questionTextFields.answer[0] = answerOne
      mockQuestionSet.questions[1].questionTextFields.answer[0] = answerTwo

      const score = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${QuestionSets.slug}/score-question-set`,
        {
          method: 'post',
          headers,
          body: JSON.stringify({
            questionSet: mockQuestionSet,
          }),
        },
      ).then((res) => res.json())

      expect(score).toEqual({ score: 1 })
    })

    it('should score 0', async () => {
      const mockQuestionSet = { ...mockQuestionSets[0] }

      const answerOne = mockQuestionSet.questions[0].questionTextFields
        .answer[0] as AnswerCheckboxBlock
      answerOne.answerCheckboxFields.answerCheckboxValue = true

      const answerTwo = mockQuestionSet.questions[1].questionTextFields
        .answer[0] as AnswerCheckboxBlock
      answerTwo.answerCheckboxFields.answerCheckboxValue = false

      mockQuestionSet.questions[0].questionTextFields.answer[0] = answerOne
      mockQuestionSet.questions[1].questionTextFields.answer[0] = answerTwo

      const score = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/question-sets/score-question-set`,
        {
          method: 'post',
          headers,
          body: JSON.stringify({
            questionSet: mockQuestionSet,
          }),
        },
      ).then((res) => res.json())

      expect(score).toEqual({ score: 0 })
    })

    it('should score 5 even if one field is blank', async () => {
      // This question has an optional text field and checkbox
      // The checkbox question is required for the set point
      const mockQuestionSet = { ...mockQuestionSets[4] }

      const answerOne = mockQuestionSet.questions[0].questionTextFields.answer[0] as AnswerTextBlock
      answerOne.answerTextFields.answerTextValue = ''

      const answerTwo = mockQuestionSet.questions[1].questionTextFields
        .answer[0] as AnswerCheckboxBlock
      answerTwo.answerCheckboxFields.answerCheckboxValue = true

      const score = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/question-sets/score-question-set`,
        {
          method: 'post',
          headers,
          body: JSON.stringify({
            questionSet: mockQuestionSet,
          }),
        },
      ).then((res) => res.json())

      expect(score).toEqual({ score: 5 })
    })
  })
})
