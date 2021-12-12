export type CreateEvent = {
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: true;
  userIds: string[];
};
