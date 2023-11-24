export const mockQuestionSets = [
  {
    questions: [
      {
        questionTextFields: {
          answer: [
            {
              answerTextFields: {
                answerTextFieldLabel: '',
                answerTextField: null,
              },
            },
          ],
          question: 'What is one goal you have set for yourself in writing?',
        },
      },
      {
        questionTextFields: {
          answer: [
            {
              answerCheckboxFields: {
                answerCheckboxField: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
          question: 'Did you complete a major goal today?',
        },
      },
    ],
    active: true,
    title: 'Goals ',
    pointValue: 5,
  },
  {
    questions: [
      {
        questionTextFields: {
          answer: [
            {
              answerCheckboxFields: {
                answerCheckboxField: null,
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
    questions: [
      {
        questionTextFields: {
          answer: [
            {
              answerTextFields: {
                answerTextFieldLabel: null,
                answerTextField: null,
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
    questions: [
      {
        questionTextFields: {
          answer: [
            {
              answerCheckboxFields: {
                answerCheckboxField: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
          question: 'Did you take 5 minutes in meditation/stillness today?',
        },
      },
    ],
    active: true,
    title: 'Mind',
    pointValue: 1,
  },
  {
    questions: [
      {
        questionTextFields: {
          answer: [
            {
              answerCheckboxFields: {
                answerCheckboxField: null,
                answerCheckboxLabel: 'Y/N',
              },
            },
          ],
          question: 'Did you work out today? (YES to BOTH to get +1)',
        },
      },
      {
        questionTextFields: {
          answer: [
            {
              answerCheckboxFields: {
                answerCheckboxField: null,
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
]
