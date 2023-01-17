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
