import { Admin, Doc, UserOnRequest } from '@elilemons/diva-score-lib'
import { Survey } from 'payload/generated-types'
import qs from 'qs'
import testCredentials from '../collections/Admins/tests/credentials'
import QuestionSets from '../collections/QuestionSets'
import { mockQuestionSets } from '../collections/QuestionSets/tests/mock'
import Surveys from '../collections/Surveys'

export const getAdmin = async (): Promise<UserOnRequest<Admin>> => {
  const adminLoginJSON: UserOnRequest<Admin> = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/admins/login`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testCredentials.email,
        password: testCredentials.password,
      }),
    },
  ).then((res) => res.json())

  return adminLoginJSON
}

export const checkForQuestionSets = async (headers: Headers): Promise<boolean> => {
  const qs = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${QuestionSets.slug}?limit=1`,
    {
      method: 'get',
      headers,
    },
  ).then((res) => res.json())
  return Promise.resolve(qs.totalDocs > 0)
}

export const createQuestionSets = async (headers: Headers): Promise<void> => {
  if (await checkForQuestionSets(headers)) {
    return
  } else {
    mockQuestionSets.forEach(
      async (questionSet) =>
        await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${QuestionSets.slug}`, {
          method: 'post',
          headers,
          body: JSON.stringify(questionSet),
        }),
    )
  }
}

export const deleteQuestionSets = async (headers: Headers): Promise<void> => {
  const query = qs.stringify(
    {
      where: {
        active: {
          equals: true,
        },
      },
    },
    { addQueryPrefix: true },
  )

  await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${QuestionSets.slug}/${query}`, {
    method: 'delete',
    headers,
  })
}

type CreateSurveyProps = {
  headers: Headers
}
export const createSurvey = async ({ headers }: CreateSurveyProps): Promise<Doc<Survey>> => {
  return await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}`, {
    method: 'post',
    headers,
    body: JSON.stringify({
      title: 'Test Survey',
    }),
  }).then((res) => res.json())
}

type DeleteSurveyProps = {
  surveyId: string
  headers: Headers
}
export const deleteSurvey = async ({ surveyId, headers }: DeleteSurveyProps) => {
  return await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${Surveys.slug}/${surveyId}`, {
    method: 'delete',
    headers,
  }).then((res) => res.json())
}
