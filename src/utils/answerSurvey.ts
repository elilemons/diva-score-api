import { QuestionSet, Survey } from '@elilemons/diva-score-lib'
import { answerQuestion } from './answerQuestion'

type SurveyAnswers = {
  [key: string]: string | boolean
}
type AnswerSurveyProps = {
  survey: Partial<Survey>
  answers: SurveyAnswers
}
export const answerSurvey = async ({
  survey,
  answers,
}: AnswerSurveyProps): Promise<Partial<Survey>> => {
  const answeredSurvey: Partial<Survey> = JSON.parse(JSON.stringify(survey)) // deep copy
  const questionKeys = Object.keys(answers)
  const questionSetKeys = questionKeys.map((questionKey) => questionKey.replace(/\d+/g, ''))

  questionSetKeys.forEach((questionSetKey) => {
    const qs = answeredSurvey.surveyQuestionSets.find(
      (qs: QuestionSet) => qs.title.toLowerCase() === questionSetKey,
    ) as QuestionSet

    if (qs) {
      qs.questions.forEach((question, index) => {
        answerQuestion({
          question,
          answerValue: answers[`${qs.title.toLowerCase()}${index + 1}`],
        })
      })
    }
  })

  return Promise.resolve(answeredSurvey)
}
