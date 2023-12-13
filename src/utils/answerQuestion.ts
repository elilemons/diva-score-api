import { QuestionBlock } from 'payload/generated-types'
import { extractBlockTypeName } from './extractBlockTypeName'

type AnswerQuestionProps = {
  question: QuestionBlock
  answerValue: string | boolean
}
export const answerQuestion = ({ question, answerValue }: AnswerQuestionProps): QuestionBlock => {
  const answeredQuestion = { ...question }
  const answerBlockName = 'answer'
  const answerBlockTypeName = extractBlockTypeName({
    blockName: answerBlockName,
    blockType: answeredQuestion.questionTextFields.answer[0].blockType,
  })

  answeredQuestion.questionTextFields[answerBlockName][0][
    `${answerBlockName}${answerBlockTypeName}Fields`
  ][`${answerBlockName}${answerBlockTypeName}Value`] = answerValue

  return answeredQuestion
}
