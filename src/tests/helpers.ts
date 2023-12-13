import { Admin, Doc, UserOnRequest } from '@elilemons/diva-score-lib'
import { Survey } from 'payload/generated-types'
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

type CreateSurveyProps = {
  headers: Headers
}
export const createSurvey = async ({ headers }: CreateSurveyProps): Promise<Doc<Survey>> => {
  mockQuestionSets.map(async (questionSet) => {
    await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${QuestionSets.slug}`, {
      method: 'post',
      headers,
      body: JSON.stringify(questionSet),
    })
  })

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
