import { QuestionSet } from '@elilemons/diva-score-lib'

export const mockQuestionSets: Array<Partial<QuestionSet>> = [
  {
    order: 1,
    active: true,
    title: 'Body',
    pointValue: 1,
    questions: [
      {
        blockType: 'questionBlock',
        questionFieldName: 'body1',
        questionOrder: 1,
        requiredForSetPoint: true,
        questionTextFields: {
          question: 'Did you work out today? (YES to BOTH to get +1)',
          answer: [
            {
              blockType: 'answerCheckboxBlock',
              answerCheckboxFields: {
                answerCheckboxValue: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
        },
      },
      {
        blockType: 'questionBlock',
        questionFieldName: 'body2',
        questionOrder: 2,
        requiredForSetPoint: true,
        questionTextFields: {
          question: 'Did you stick to your diet today?',
          answer: [
            {
              blockType: 'answerCheckboxBlock',
              answerCheckboxFields: {
                answerCheckboxValue: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
        },
      },
    ],
  },
  {
    order: 2,
    active: true,
    title: 'Mind',
    pointValue: 1,
    questions: [
      {
        blockType: 'questionBlock',
        questionFieldName: 'mind1',
        questionOrder: 1,
        requiredForSetPoint: true,
        questionTextFields: {
          question: 'Did you take 5 minutes in meditation/stillness today?',
          answer: [
            {
              blockType: 'answerCheckboxBlock',
              answerCheckboxFields: {
                answerCheckboxValue: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
        },
      },
    ],
  },
  {
    order: 3,
    active: true,
    title: 'Spirit',
    pointValue: 1,
    questions: [
      {
        blockType: 'questionBlock',
        questionFieldName: 'spirit1',
        questionOrder: 1,
        requiredForSetPoint: true,
        questionTextFields: {
          answer: [
            {
              blockType: 'answerTextBlock',
              answerTextFields: {
                answerTextFieldLabel: null,
                answerTextValue: null,
              },
            },
          ],
          question: 'What are you grateful for today?',
        },
      },
    ],
  },
  {
    order: 4,
    active: true,
    title: 'Connection',
    pointValue: 1,
    questions: [
      {
        requiredForSetPoint: true,
        blockType: 'questionBlock',
        questionFieldName: 'connection1',
        questionOrder: 1,
        questionTextFields: {
          answer: [
            {
              blockType: 'answerCheckboxBlock',
              answerCheckboxFields: {
                answerCheckboxValue: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
          question: 'Did you truly connect with one person today?',
        },
      },
    ],
  },
  {
    order: 5,
    active: true,
    pointValue: 5,
    title: 'Goals ',
    questions: [
      {
        requiredForSetPoint: false,
        blockType: 'questionBlock',
        questionFieldName: 'goal1',
        questionOrder: 1,
        questionTextFields: {
          question: 'What is one goal you have set for yourself in writing?',
          answer: [
            {
              blockType: 'answerTextBlock',
              answerTextFields: {
                answerTextFieldLabel: '',
                answerTextValue: null,
              },
            },
          ],
        },
      },
      {
        blockType: 'questionBlock',
        questionFieldName: 'goal2',
        questionOrder: 2,
        requiredForSetPoint: true,
        questionTextFields: {
          question: 'Did you complete a major goal today?',
          answer: [
            {
              blockType: 'answerCheckboxBlock',
              answerCheckboxFields: {
                answerCheckboxValue: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
        },
      },
    ],
  },
]
