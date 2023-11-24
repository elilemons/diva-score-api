import Surveys from '..'
import QuestionSets from '../../QuestionSets'
import { mockQuestionSets } from '../../QuestionSets/tests/mock'
import { getAdminToken } from './helpers'

describe('Surveys', () => {
  let adminToken
  beforeAll(async () => {
    adminToken = await getAdminToken()

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
