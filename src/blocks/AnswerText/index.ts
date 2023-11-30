import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'

export const AnswerText: Block = {
  slug: 'answerTextBlock',
  fields: [
    blockFields({
      name: 'answerTextFields',
      fields: [
        {
          // Label shown to the user
          type: 'text',
          name: 'answerTextFieldLabel',
          label: 'Answer Text Field Label',
        },
        {
          // The value the user fills out
          type: 'richText',
          name: 'answerTextValue',
          label: 'Answer Value',
        },
      ],
    }),
  ],
}
