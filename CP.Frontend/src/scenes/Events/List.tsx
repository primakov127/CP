import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Event } from '../../models/Event';
import { eventService } from '../../services/eventService';
import moment from 'moment';
import styled from 'styled-components';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const List = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    eventService
      .getMyEvents()
      .then((result) =>
        result.events?.map((e) => ({ ...e, start: new Date(e.start), end: new Date(e.end) }))
      )
      .then((mappedEvents) => setEvents(mappedEvents as Event[]));
  }, [setEvents]);

  return (
    <CalendarContainer>
      <Calendar
        selectable
        events={events}
        localizer={localizer}
        onSelectEvent={(e) => console.log(e)}
        onSelectSlot={(s) => console.log(s)}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  height: 600px;
`;
