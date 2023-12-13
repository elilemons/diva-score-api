import { QuestionBlock, QuestionSet } from '@elilemons/diva-score-lib'
import { AnswerCheckboxBlock, AnswerRichTextBlock, AnswerTextBlock } from 'payload/generated-types'
import { mockQuestionSets } from '../../collections/QuestionSets/tests/mock'
import { answerQuestion } from '../answerQuestion'

describe('Answer Question', () => {
  it('should answer the question with TRUE', () => {
    const question: QuestionBlock = mockQuestionSets[0].questions[0]
    const result: QuestionBlock = answerQuestion({
      question,
      answerValue: true,
    })

    const answer = result.questionTextFields.answer[0] as AnswerCheckboxBlock

    expect(answer.answerCheckboxFields.answerCheckboxValue).toBeTruthy()
  })

  it('should answer the question with "I am grateful for my cat."', () => {
    const question: QuestionBlock = mockQuestionSets.find(
      (qs: QuestionSet) => qs.title === 'Spirit',
    ).questions[0]
    const gratitude = 'I am grateful for my cat.'
    const result: QuestionBlock = answerQuestion({
      question,
      answerValue: gratitude,
    })

    const answer = result.questionTextFields.answer[0] as AnswerTextBlock

    expect(answer.answerTextFields.answerTextValue).toEqual(gratitude)
  })

  it('should answer the question with "My goal today was to apply to 3 jobs!"', () => {
    const question: QuestionBlock = mockQuestionSets.find((qs: QuestionSet) => qs.title === 'Goals')
      .questions[0]
    const goal = 'My goal today was to apply to 3 jobs!'
    const result: QuestionBlock = answerQuestion({
      question,
      answerValue: goal,
    })

    const answer = result.questionTextFields.answer[0] as AnswerRichTextBlock

    expect(answer.answerRichTextFields.answerRichTextValue).toEqual(goal)
  })
})
