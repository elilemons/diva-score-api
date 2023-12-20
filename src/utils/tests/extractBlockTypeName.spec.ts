import { QuestionBlock, QuestionSet } from '@elilemons/diva-score-lib'
import { mockQuestionSets } from '../../collections/QuestionSets/tests/mock'
import { extractBlockTypeName } from '../extractBlockTypeName'

describe('Extract Block Type Name', () => {
  it('should find checkbox', () => {
    const question = mockQuestionSets
      .find((qs: QuestionSet) => qs.title === 'Body')
      .questions.find((q: QuestionBlock) => q.questionFieldName === 'body1')

    const result = extractBlockTypeName({
      blockName: 'answer',
      blockType: question.questionTextFields.answer[0].blockType,
    })

    expect(result.toLowerCase()).toBe('checkbox')
  })

  it('should find text', () => {
    const question = mockQuestionSets
      .find((qs: QuestionSet) => qs.title === 'Spirit')
      .questions.find((q: QuestionBlock) => q.questionFieldName === 'spirit1')

    const result = extractBlockTypeName({
      blockName: 'answer',
      blockType: question.questionTextFields.answer[0].blockType,
    })

    expect(result.toLowerCase()).toBe('text')
  })

  it('should find richText', () => {
    const question = mockQuestionSets
      .find((qs: QuestionSet) => qs.title === 'Goals')
      .questions.find((q: QuestionBlock) => q.questionFieldName === 'goals1')

    const result = extractBlockTypeName({
      blockName: 'answer',
      blockType: question.questionTextFields.answer[0].blockType,
    })

    expect(result.toLowerCase()).toBe('richtext')
  })
})
