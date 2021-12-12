import { GetMyEventsResult } from '../models/results/GetMyEventsResult';
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

export const eventService = {
  getMyEvents
};
