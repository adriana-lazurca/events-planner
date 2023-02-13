import { Component, Event } from '../features/events/types';

export const schema: Component[] = [
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
  {
    name: ['startDate', 'endDate'],
    label: ['Start date', 'End date'],
    rangeLabel: 'Date',
    rangeName: 'date',
    component: 'range_picker',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    component: 'textarea',
  },
];

export const events: Event[] = [
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
