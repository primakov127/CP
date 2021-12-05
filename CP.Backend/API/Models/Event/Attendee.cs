using System;

namespace API.Models.Event
{
    public class Attendee
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }

        public virtual Event Event { get; set; }
    }
}