import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../../access/roles'
import { statusField } from '../../fields/status'
import QuestionSets from '../QuestionSets'
import beforeChangeHook from './hooks/beforeChange'

const Surveys: CollectionConfig = {
  slug: 'surveys',
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
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
