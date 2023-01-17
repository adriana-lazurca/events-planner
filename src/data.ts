import { Event } from './dataTypes';

export const data: Event[] = [
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
  {
    id: '3',
    title: 'Coca-Cola Event',
    type: 'generic',
    startDate: '2022-12-21',
    endDate: '2022-12-24',
    description: 'New soda tasting',
  },
  {
    id: '4',
    title: 'Proximus new launch',
    type: 'content',
    startDate: '2020-12-19',
    endDate: '2020-12-20',
    description: 'Offers for Tv + Internet',
  },
];
