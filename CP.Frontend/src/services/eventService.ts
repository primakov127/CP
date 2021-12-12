import { CreateEvent } from '../models/messages/CreateEvent';
import { GetMyEventsResult } from '../models/results/GetMyEventsResult';
import { Result } from '../models/results/Result';
import { getAxiosClient } from '../utils/getAxiosClient';

const getMyEvents = async (): Promise<GetMyEventsResult> => {
  try {
    const result = (await getAxiosClient().get('/api/event/getmyevents')).data;

    return {
      isSuccessful: true,
      events: result
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

const createEvent = async (message: CreateEvent): Promise<Result> => {
  try {
    await getAxiosClient().post('/api/event/create', message);

    return {
      isSuccessful: true
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

export const eventService = {
  getMyEvents,
  createEvent
};
