import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../../access/roles'
import { Question } from '../../blocks/Question'
import { scoreQuestionSetEndpoint } from './endpoints/scoreQuestionSet'

const QuestionSets: CollectionConfig = {
  slug: 'question-sets',
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  defaultSort: 'order',
  endpoints: [
    {
      path: '/score-question-set',
      handler: scoreQuestionSetEndpoint,
      method: 'post',
    },
  ],
  fields: [
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      index: true,
    },
    {
      name: 'pointValue',
      type: 'number',
      label: 'Point Value',
    },
    {
      name: 'pointsEarned',
      type: 'number',
      label: 'Point Earned',
    },
    {
      name: 'order',
      type: 'number',
      min: 0,
      unique: true,
    },
    {
      name: 'questions',
      type: 'blocks',
      minRows: 1,
      blocks: [Question],
    },
  ],
}

export default QuestionSets
