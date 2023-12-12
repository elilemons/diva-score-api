import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'

export const AnswerText: Block = {
  slug: 'answerTextBlock',
  interfaceName: 'AnswerTextBlock',
  fields: [
    blockFields({
      name: 'answerTextFields',
      fields: [
        {
          type: 'text',
          name: 'answerTextFieldLabel',
          label: 'Answer Text Field Label',
          admin: {
            description: 'This is the label that is shown to the user.',
          },
        },
        {
          type: 'text',
          name: 'answerTextValue',
          label: 'Answer Value',
          admin: {
            description: 'This is the value the user enters.',
          },
        },
      ],
    }),
  ],
}
