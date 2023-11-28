import Surveys from '..'
import { getAdmin } from '../../../tests/helpers'
import QuestionSets from '../../QuestionSets'
import { mockQuestionSets } from '../../QuestionSets/tests/mock'

describe('Surveys', () => {
  let admin
  let adminToken

  beforeAll(async () => {
    admin = await getAdmin()
    adminToken = admin.token

    mockQuestionSets.map(async (questionSet) => {
      await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${QuestionSets.slug}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify(questionSet),
      })
    })
  })

  it('should create a survey with 5 question sets', async () => {
    const result = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Test Survey',
      }),
    }).then((res) => res.json())

    expect(result.doc.surveyQuestionSets.length).toBeGreaterThan(0)
    expect(result.doc.surveyQuestionSets.length).toBe(mockQuestionSets.length)
  })
})
