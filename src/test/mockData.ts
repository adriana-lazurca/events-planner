export const schema = [
  {
    name: 'title',
    label: 'Title',
    component: 'text',
    required: true,
  },
  {
    name: 'type',
    label: 'Type',
    component: 'select',
    required: true,
    options: [
      {
        label: 'Generic',
        value: 'generic',
      },
      {
        label: 'Holiday',
        value: 'holiday',
      },
    ],
  },
];

export const events = [
  {
    id: '1',
    title: 'Champions league',
    type: 'competitor',
    startDate: '2020-07-01',
    endDate: '2020-08-12',
    description: 'This is an event about the start of this year',
  },
  {
    id: '2',
    title: 'Christmas',
    type: 'holiday',
    startDate: '2022-12-25',
    endDate: '2022-12-27',
    description: 'Celebrating Christmas',
  },
];
