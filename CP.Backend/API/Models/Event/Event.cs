using System;
using System.Collections.Generic;

namespace API.Models.Event
{
    public class Event
    {
        public Guid Id { get; set; }
        public Guid CreatorUserId { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool AllDay { get; set; }

        public virtual EventDetails Details { get; set; }
        public virtual ICollection<Attendee> Attendees { get; set; }
    }
}