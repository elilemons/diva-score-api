import { QuestionSet } from 'payload/generated-types'

export const mockQuestionSets: Array<Partial<QuestionSet>> = [
  {
    order: 1,
    questions: [
      {
        blockType: 'questionBlock',
        questionFieldName: 'body1',
        questionOrder: 1,
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
          question: 'Did you stick to your diet today?',
        },
      },
    ],
    active: true,
    title: 'Body',
    pointValue: 1,
  },
  {
    order: 2,
    questions: [
      {
        blockType: 'questionBlock',
        questionFieldName: 'mind1',
        questionOrder: 1,
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
    active: true,
    title: 'Mind',
    pointValue: 1,
  },
  {
    order: 3,
    questions: [
      {
        blockType: 'questionBlock',
        questionFieldName: 'spirit1',
        questionOrder: 1,
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
    active: true,
    title: 'Spirit',
    pointValue: 1,
  },
  {
    order: 4,
    questions: [
      {
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
    active: true,
    title: 'Connection',
    pointValue: 1,
  },
  {
    order: 5,
    questions: [
      {
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
    active: true,
    title: 'Goals ',
    pointValue: 5,
  },
]
