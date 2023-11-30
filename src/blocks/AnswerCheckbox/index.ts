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
          // Value the user fills out
          type: 'checkbox',
          name: 'answerCheckboxValue',
          label: 'Answer Value',
        },
      ],
    }),
  ],
}
