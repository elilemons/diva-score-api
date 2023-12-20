import { QuestionSet, Survey } from '@elilemons/diva-score-lib'
import { scoreQuestionSet } from './scoreQuestionSet'

export const scoreSurvey = async (survey: Survey): Promise<{ score: number }> => {
  const initialScore = 0

  const score: number = await Promise.all(
    survey.surveyQuestionSets.map(
      async (qs: QuestionSet) => await scoreQuestionSet(qs).then((res) => res.score),
    ),
  ).then((scores) => scores.reduce((acc, curr) => acc + curr, initialScore))

  return Promise.resolve({ score })
}
