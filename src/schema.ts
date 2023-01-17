import { Component } from './schemaTypes';

export const schema: Component[] = [
  {
    name: 'title',
    label: 'Title',
    component: 'text',
    required: true,
  },
  {
    name: 'type',
    component: 'select',
    label: 'Type',
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
    component: 'range_picker',
    label: ['Start date', 'End date'],
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    component: 'textarea',
    required: false,
  },
];
