import { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import { AnswerCheckbox } from '../AnswerCheckbox'
import { AnswerText } from '../AnswerText'

export const Question: Block = {
  slug: 'questionBlock',
  fields: [
    blockFields({
      name: 'questionTextFields',
      fields: [
        {
          type: 'text',
          name: 'question',
          label: 'Question',
        },
        {
          type: 'blocks',
          name: 'answer',
          blocks: [AnswerCheckbox, AnswerText],
        },
      ],
    }),
  ],
}
