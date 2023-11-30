import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'

export const AnswerCheckbox: Block = {
  slug: 'answerCheckboxBlock',
  interfaceName: 'AnswerCheckboxBlock',
  fields: [
    blockFields({
      name: 'answerCheckboxFields',
      fields: [
        {
          type: 'text',
          name: 'answerCheckboxLabel',
          label: 'Answer Checkbox Label',
          admin: {
            description: 'This is the label that is shown to the user.',
          },
        },
        {
          type: 'checkbox',
          name: 'answerCheckboxValue',
          label: 'Answer Value',
          admin: {
            description: 'This is the value the user enters.',
          },
        },
      ],
    }),
  ],
}
