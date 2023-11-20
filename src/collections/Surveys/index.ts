import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../../access/roles'
import { statusField } from '../../fields/status'

const Surveys: CollectionConfig = {
  slug: 'surveys',
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
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
        },
      },
    },
  ],
}

export default Surveys
