export type UpdateEvent = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: true;
  userIds: string[];
};
