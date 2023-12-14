import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminOrRequestingSelf } from '../../access/roles'
import { statusField } from '../../fields/status'
import QuestionSets from '../QuestionSets'
import Users from '../Users'
import { getTodaysSurveyEndpoint } from './endpoints/getTodaysSurvey'
import { scoreSurveyEndpoint } from './endpoints/scoreSurvey'
import beforeChangeHook from './hooks/beforeChange'

const Surveys: CollectionConfig = {
  slug: 'surveys',
  access: {
    create: () => true,
    read: () => true, // TODO is survey user
    update: isAdminOrRequestingSelf, // TODO is survey user
    delete: isAdmin, // TODO is survey user
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  endpoints: [
    {
      path: '/get-todays-survey',
      method: 'get',
      handler: getTodaysSurveyEndpoint,
    },
    {
      path: '/score-survey',
      method: 'post',
      handler: scoreSurveyEndpoint,
    },
  ],
  defaultSort: '-surveyDate',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      ...statusField,
    },
    {
      name: 'surveyDate',
      type: 'date',
      defaultValue: new Date().toString(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
      required: true,
    },
    {
      name: 'surveyUser',
      type: 'relationship',
      relationTo: Users.slug,
      required: false,
    },
    {
      name: 'surveyQuestionSets',
      type: 'relationship',
      relationTo: QuestionSets.slug,
      hasMany: true,
      label: 'Survey Question Sets',
    },
  ],
}

export default Surveys
