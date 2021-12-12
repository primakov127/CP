export type Event = {
  id: string;
  creatorUserId: string;
  title: string;
  start: Date;
  end: Date;
  allDay: false;
  details: {
    description: string;
  };
  attendees: Array<{
    userId: string;
  }>;
};
