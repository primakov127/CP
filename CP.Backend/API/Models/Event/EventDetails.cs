using System;

namespace API.Models.Event
{
    public class EventDetails
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public string Description { get; set; }

        public virtual Event Event { get; set; }
    }
}