using System;
using System.Collections.Generic;
using API.Models.Auth;
using API.Models.Event;

namespace API.Interfaces.Services
{
    public interface IEventService
    {
        public IEnumerable<Event> GetUserEvents(User user);
        public Event Get(Guid id);
        public bool Create(Event model);
        public bool Update(Event model);
        public bool Delete(Guid id);
    }
}