import { Event } from '../Event';
import { Result } from './Result';

export type GetEventResult = Result & {
  event?: Event;
};
