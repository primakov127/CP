import { CreateEvent } from '../models/messages/CreateEvent';
import { GetMyEventsResult } from '../models/results/GetMyEventsResult';
import { Result } from '../models/results/Result';
import { getAxiosClient } from '../utils/getAxiosClient';
import { GetEventResult } from '../models/results/GetEventResult';
import { RemoveEvent } from '../models/messages/RemoveEvent';
import { UpdateEvent } from '../models/messages/UpdateEvent';

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

const getEvent = async (id: string): Promise<GetEventResult> => {
  try {
    const result = (await getAxiosClient().get(`/api/event/${id}`)).data;

    return {
      isSuccessful: true,
      event: result
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

const removeEvent = async (message: RemoveEvent) => {
  try {
    await getAxiosClient().post('/api/event/remove', message);

    return {
      isSuccessful: true
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

const updateEvent = async (message: UpdateEvent) => {
  try {
    await getAxiosClient().post('/api/event/update', message);

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
  createEvent,
  getEvent,
  removeEvent,
  updateEvent
};
