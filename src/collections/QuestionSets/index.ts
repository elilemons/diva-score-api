import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../../access/roles'
import { Question } from '../../blocks/Question'
import Surveys from '../Surveys'

const QuestionSet: CollectionConfig = {
  slug: 'questionSets',
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'pointValue',
      type: 'number',
      label: 'Point Value',
    },
    {
      name: 'survey',
      type: 'relationship',
      relationTo: Surveys.slug,
    },
    {
      name: 'questions',
      type: 'blocks',
      minRows: 1,
      blocks: [Question],
    },
  ],
}

export default QuestionSet
