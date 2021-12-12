import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Event } from '../../models/Event';
import { eventService } from '../../services/eventService';
import moment from 'moment';
import styled from 'styled-components';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

export const List = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelectEvent = (event: { id: string }) => {
    navigate(`/events/${event.id}`);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    navigate(`/events/add?start=${start.toISOString()}&end=${end.toISOString()}`);
  };

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
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot as any}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  height: 800px;
`;
