type EventType = 'generic' | 'holiday' | 'competitor' | 'content';

export type Event = {
  id: string;
  type: EventType;
  [name: string]: string;
};
