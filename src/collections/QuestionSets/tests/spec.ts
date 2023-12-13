import { QuestionSet, UserOnRequest } from '@elilemons/diva-score-lib'
import { Admin } from 'payload/generated-types'
import QuestionSets from '..'
// import QuestionSets from '..'
import { getAdmin } from '../../../tests/helpers'
import { answerQuestion } from '../../../utils/answerQuestion'
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

      mockQuestionSet.questions[0] = answerQuestion({
        question: mockQuestionSet.questions[0],
        answerValue: true,
      })

      mockQuestionSet.questions[1] = answerQuestion({
        question: mockQuestionSet.questions[1],
        answerValue: true,
      })

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

      mockQuestionSet.questions[0] = answerQuestion({
        question: mockQuestionSet.questions[0],
        answerValue: true,
      })

      mockQuestionSet.questions[1] = answerQuestion({
        question: mockQuestionSet.questions[1],
        answerValue: false,
      })

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
      const mockQuestionSet = {
        ...mockQuestionSets.find((qs: QuestionSet) => qs.title === 'Goals'),
      }

      mockQuestionSet.questions[1] = answerQuestion({
        question: mockQuestionSet.questions[1],
        answerValue: true,
      })

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
