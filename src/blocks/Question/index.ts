import { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import { AnswerCheckbox } from '../AnswerCheckbox'
import { AnswerRichText } from '../AnswerRichText'
import { AnswerText } from '../AnswerText'

export const Question: Block = {
  slug: 'questionBlock',
  interfaceName: 'QuestionBlock',
  fields: [
    {
      name: 'questionFieldName',
      type: 'text',
      label: 'Question Field Name',
      required: true,
      admin: {
        description:
          'questionSetNameQuestionNumber - Number should match question order. Example: body1, body2. Used for matching the answers to the question.',
      },
    },
    {
      name: 'questionOrder',
      type: 'number',
      label: 'Question Order',
      required: true,
      min: 0,
    },
    blockFields({
      name: 'questionTextFields',
      fields: [
        {
          type: 'text',
          name: 'question',
          label: 'Question',
          required: true,
          admin: {
            description: 'This is the question presented to the user.',
          },
        },
        {
          type: 'blocks',
          name: 'answer',
          required: true,
          blocks: [AnswerCheckbox, AnswerText, AnswerRichText],
          minRows: 1,
          maxRows: 1,
        },
      ],
    }),
  ],
}
