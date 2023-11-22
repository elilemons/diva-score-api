import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'

export const AnswerCheckbox: Block = {
  slug: 'answerCheckboxBlock',
  fields: [
    blockFields({
      name: 'answerCheckboxFields',
      fields: [
        {
          // Label shown to the User
          type: 'text',
          name: 'answerCheckboxLabel',
          label: 'Answer Checkbox Label',
        },
        {
          // Checkbox shown to the User
          type: 'checkbox',
          name: 'answerCheckboxField',
          label: 'Answer Checkbox',
        },
      ],
    }),
  ],
}
