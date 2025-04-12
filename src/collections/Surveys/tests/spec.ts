import { Admin, Doc, Survey, UserOnRequest } from '@elilemons/diva-score-lib'
import Surveys from '..'
import { createQuestionSets, createSurvey, deleteSurvey, getAdmin } from '../../../tests/helpers'
import { mockQuestionSets } from '../../QuestionSets/tests/mock'

describe('Surveys', () => {
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

    await createQuestionSets(headers)
  })

  describe('it should test creating a survey', () => {
    let testSurvey: Doc<Survey>
    beforeAll(async () => {
      testSurvey = await createSurvey({ headers }).then((res) => res)
    })

    afterAll(async () => {
      if (testSurvey && testSurvey.doc && testSurvey.doc.id) {
        await deleteSurvey({ surveyId: testSurvey.doc.id, headers })
      }
    })

    it('should have 5 question sets', () => {
      expect(testSurvey.doc.surveyQuestionSets.length).toBeGreaterThan(0)
      expect(testSurvey.doc.surveyQuestionSets.length).toBe(mockQuestionSets.length)
    })

    it('should be set to todays date', () => {
      expect(new Date(testSurvey.doc.surveyDate).setHours(0, 0, 0, 0)).toBe(
        new Date(Date.now()).setHours(0, 0, 0, 0),
      )
    })

    it('should have set the user to the test admin user', () => {
      expect(testSurvey.doc.surveyUser).toBe(admin.user.id)
    })

    it('should not allow the user to create more than one survey a day', async () => {
      const secondSurvey = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            title: 'Test Survey 2',
          }),
        },
      ).then((res) => res.json())

      expect(secondSurvey).toEqual({ errors: [{ message: 'Something went wrong.' }] })
    })
  })

  describe('should test finding todays survey', () => {
    it('should not find a survey', async () => {
      const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-todays-survey`,
        {
          method: 'GET',
          headers,
        },
      ).then((res) => {
        expect(res.status).toBe(200)
        return res.json()
      })

      expect(res.id).toBeUndefined()
    })

    it('should find a survey', async () => {
      const testSurvey2 = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            title: 'Test Survey',
          }),
        },
      ).then((res) => res.json())

      const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-todays-survey`,
        {
          method: 'GET',
          headers,
        },
      ).then((res) => {
        expect(res.status).toBe(200)
        return res.json()
      })

      expect(res.id).toBe(testSurvey2.doc.id)

      await deleteSurvey({
        surveyId: testSurvey2.doc.id,
        headers,
      })
    })
  })

  describe('should test getting a users surveys', () => {
    it('should not find any surveys', async () => {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-users-surveys`,
        {
          method: 'GET',
          headers,
        },
      ).then(async (res) => {
        expect(res.status).toBe(200)

        const surveys = await res.json()
        expect(surveys.totalDocs).toBe(0)
      })
    })

    it('should find a survey', async () => {
      const testSurvey: Doc<Survey> = await createSurvey({ headers }).then((res) => res)

      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-users-surveys`,
        {
          method: 'GET',
          headers,
        },
      ).then(async (res) => {
        expect(res.status).toBe(200)

        const surveys = await res.json()
        expect(surveys.totalDocs).toBe(1)
        expect(surveys.docs[0].id).toBe(testSurvey.doc.id)
      })

      await deleteSurvey({ surveyId: testSurvey.doc.id, headers })
    })
  })

  describe('it should find multiple user surveys', () => {
    let survey1: Doc<Survey>
    let survey2: Doc<Survey>
    let survey3: Doc<Survey>

    beforeAll(async () => {
      survey1 = await createSurvey({
        headers,
      }).then((res) => res)
      survey2 = await createSurvey({
        surveyDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        headers,
      }).then((res) => res)
      survey3 = await createSurvey({
        surveyDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        headers,
      }).then((res) => res)
    })

    afterAll(async () => {
      await deleteSurvey({ surveyId: survey1.doc.id, headers })
      await deleteSurvey({ surveyId: survey2.doc.id, headers })
      await deleteSurvey({ surveyId: survey3.doc.id, headers })
    })

    it('should find multiple surveys', async () => {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-users-surveys`,
        {
          method: 'GET',
          headers,
        },
      ).then(async (res) => {
        expect(res.status).toBe(200)

        const surveys = await res.json()

        expect(surveys.totalDocs).toBe(3)
        expect(surveys.docs[0].id).toBe(survey1.doc.id)
        expect(surveys.docs[1].id).toBe(survey2.doc.id)
        expect(surveys.docs[2].id).toBe(survey3.doc.id)
      })
    })
  })

  describe('it should test the total score endpoint', () => {
    let survey1: Doc<Survey>
    let survey2: Doc<Survey>
    let survey3: Doc<Survey>

    beforeAll(async () => {
      survey1 = await createSurvey({
        headers,
      }).then((res) => res)
      survey2 = await createSurvey({
        surveyDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        headers,
      }).then((res) => res)
      survey3 = await createSurvey({
        surveyDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        headers,
      }).then((res) => res)
    })

    afterAll(async () => {
      await deleteSurvey({ surveyId: survey1.doc.id, headers })
      await deleteSurvey({ surveyId: survey2.doc.id, headers })
      await deleteSurvey({ surveyId: survey3.doc.id, headers })
    })

    it('should find a total score of 0', async () => {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-users-total-score`,
        {
          method: 'GET',
          headers,
        },
      ).then(async (res) => {
        expect(res.status).toBe(200)

        const score = await res.json()

        expect(score.totalScore).toBe(0)
      })
    })

    it('should find a total score of 1', async () => {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/${survey1.doc.id}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            body1: true,
            body2: true,
          }),
        },
      )

      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-users-total-score`,
        {
          method: 'GET',
          headers,
        },
      ).then(async (res) => {
        expect(res.status).toBe(200)

        const score = await res.json()

        expect(score.totalScore).toBe(1)
      })
    })

    it('should find a total score of 3', async () => {
      ;[survey1, survey2, survey3].forEach(
        async (survey) =>
          await fetch(
            `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/${survey.doc.id}`,
            {
              method: 'PATCH',
              headers,
              body: JSON.stringify({
                body1: true,
                body2: true,
              }),
            },
          ),
      )

      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/get-users-total-score`,
        {
          method: 'GET',
          headers,
        },
      ).then(async (res) => {
        expect(res.status).toBe(200)

        const score = await res.json()

        expect(score.totalScore).toBe(1)
      })
    })
  })
})
