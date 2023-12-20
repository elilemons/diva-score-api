import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'

export const AnswerRichText: Block = {
  slug: 'answerRichTextBlock',
  interfaceName: 'AnswerRichTextBlock',
  fields: [
    blockFields({
      name: 'answerRichTextFields',
      fields: [
        {
          type: 'text',
          name: 'answerRichTextFieldLabel',
          label: 'Answer Rich Text Field Label',
          admin: {
            description: 'This is the label that is shown to the user.',
          },
        },
        {
          type: 'richText',
          name: 'answerRichTextValue',
          label: 'Answer Value',
          admin: {
            description: 'This is the value the user enters.',
          },
        },
      ],
    }),
  ],
}
