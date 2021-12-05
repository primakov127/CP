using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contexts;
using API.Interfaces.Services;
using API.Models.Auth;
using API.Models.Event;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class EventService : IEventService
    {
        private readonly AppDbContext _context;

        public EventService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Event> GetUserEvents(User user)
        {
            return _context.Events
                .Where(e => e.Attendees.FirstOrDefault(a => a.UserId == user.Id) != null || e.CreatorUserId == user.Id);
        }

        public Event Get(Guid id)
        {
            return _context.Events
                .Include(e => e.Attendees)
                .Include(e => e.Details)
                .FirstOrDefault(e => e.Id == id);
        }

        public bool Create(Event model)
        {
            try
            {
                _context.Events.Add(model);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        public bool Update(Event model)
        {
            try
            {
                _context.Events.Update(model);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        public bool Delete(Guid id)
        {
            var @event = _context.Events.FirstOrDefault(e => e.Id == id);
            if (@event == null)
            {
                return false;
            }

            try
            {
                _context.Events.Remove(@event);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
    }
}