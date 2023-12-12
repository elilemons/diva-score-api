import { SelectField } from 'payload/types'

export const statusField: SelectField = {
  name: 'status',
  label: 'Status',
  type: 'select',
  options: [
    {
      label: 'Started',
      value: 'started',
    },
    {
      label: 'Uncompleted',
      value: 'uncompleted',
    },
    {
      label: 'Completed',
      value: 'completed',
    },
  ],
  admin: {
    isClearable: true,
  },
}
