import { QuestionSet } from '@elilemons/diva-score-lib'
import { extractBlockTypeName } from './extractBlockTypeName'

export const scoreQuestionSet = (questionSet: QuestionSet): Promise<{ score: number }> => {
  let score = 0

  const doesScore = questionSet.questions.every((q) => {
    const answerBlockName = 'answer'
    const blockTypeName = extractBlockTypeName({
      blockName: answerBlockName,
      blockType: q.questionTextFields.answer[0].blockType,
    })

    // answerCheckboxFields.answerCheckboxValue, etc etc
    return q.requiredForSetPoint
      ? q.questionTextFields[answerBlockName][0].blockType ===
          `${answerBlockName}${blockTypeName}Block` &&
          q.questionTextFields[answerBlockName][0][`${answerBlockName}${blockTypeName}Fields`][
            `${answerBlockName}${blockTypeName}Value`
          ]
      : true
  })

  if (doesScore) {
    score = questionSet.pointValue
  }

  return Promise.resolve({ score })
}
