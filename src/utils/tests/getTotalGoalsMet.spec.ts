import { Admin, Survey, UserOnRequest } from '@elilemons/diva-score-lib'
import {
  createQuestionSets,
  createSurvey,
  deleteSurvey,
  getAdmin,
  saveSurvey,
} from '../../tests/helpers'
import { jest } from '@jest/globals'

describe('Get Total Goals Met Tests', () => {
  jest.setTimeout(6000)

  let admin: UserOnRequest<Admin>
  let adminToken: string
  let headers: Headers
  let surveyToScore1: Survey
  let surveyToScore2: Survey
  let surveyToScore3: Survey

  beforeAll(async () => {
    admin = await getAdmin()
    adminToken = admin.token
    headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `JWT ${adminToken}`,
    })
    await createQuestionSets(headers)
    surveyToScore1 = await createSurvey({ headers }).then((res) => res.doc)
    surveyToScore2 = await createSurvey({ surveyDate: '4/2/2023', headers }).then((res) => res.doc)
    surveyToScore3 = await createSurvey({ surveyDate: '4/3/2023', headers }).then((res) => res.doc)
  })

  beforeEach(async () => {
    ;[surveyToScore1, surveyToScore2, surveyToScore3].forEach(async (survey) => {
      await saveSurvey({
        id: survey.id,
        headers,
        answers: { goals1: false },
      })
    })
  })

  afterAll(async () => {
    ;[surveyToScore1, surveyToScore2, surveyToScore3].forEach(async (survey) => {
      if (survey && survey && survey.id) {
        await deleteSurvey({ surveyId: survey.id, headers })
      }
    })
  })

  it('should find that 0 goals have been met', async () => {
    const result = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/surveys/get-total-goals-met`,
      {
        method: 'GET',
        headers,
      },
    ).then((res) => res.json())

    expect(result).toEqual({ totalGoals: 0 })
  })

  it('should find that 1 goals have been met', async () => {
    await saveSurvey({
      id: surveyToScore1.id,
      headers,
      answers: { goals1: true },
    })

    const result = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/surveys/get-total-goals-met`,
      {
        method: 'GET',
        headers,
      },
    ).then((res) => res.json())

    expect(result).toEqual({ totalGoals: 1 })
  })

  it('should find that 2 goals have been met', async () => {
    await saveSurvey({
      id: surveyToScore1.id,
      headers,
      answers: { goals1: true },
    })
    await saveSurvey({
      id: surveyToScore2.id,
      headers,
      answers: { goals1: true },
    })

    const result = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/surveys/get-total-goals-met`,
      {
        method: 'GET',
        headers,
      },
    ).then((res) => res.json())

    expect(result).toEqual({ totalGoals: 2 })
  })

  it('should find that 3 goals have been met', async () => {
    ;[surveyToScore1, surveyToScore2, surveyToScore3].forEach(async (survey) => {
      await saveSurvey({
        id: survey.id,
        headers,
        answers: { goals1: true },
      })
    })

    const result = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/surveys/get-total-goals-met`,
      {
        method: 'GET',
        headers,
      },
    ).then((res) => res.json())

    expect(result).toEqual({ totalGoals: 3 })
  })
})
