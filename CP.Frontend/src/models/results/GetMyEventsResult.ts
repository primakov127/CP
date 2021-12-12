import { Result } from './Result';

export type GetMyEventsResult = Result & {
  events?: Array<{
    id: string;
    creatorUserId: string;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
  }>;
};
