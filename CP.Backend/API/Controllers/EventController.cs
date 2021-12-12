using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Extensions;
using API.Interfaces.Services;
using API.Messages;
using API.Models.Auth;
using API.Models.Event;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EventController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly IEventService _eventService;

        public EventController(UserManager<User> userManager, IEmailService emailService, IEventService eventService)
        {
            _userManager = userManager;
            _emailService = emailService;
            _eventService = eventService;
        }

        [HttpGet("getmyevents")]
        public async Task<IActionResult> GetMyEvents()
        {
            var userId = HttpContext.GetClaim("userId");
            var user = await _userManager.FindByIdAsync(userId);
            var events = _eventService.GetUserEvents(user);
            if (events == null)
            {
                return BadRequest();
            }

            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var @event = _eventService.Get(Guid.Parse(id));
            if (@event == null)
            {
                return BadRequest();
            }

            return Ok(@event);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(Create message)
        {
            var userId = HttpContext.GetClaim("userId");

            var newEvent = new Event
            {
                CreatorUserId = Guid.Parse(userId),
                Title = message.Title,
                Start = message.Start,
                End = message.End,
                AllDay = message.AllDay,
                Details = new EventDetails
                {
                    Description = message.Description
                },
                Attendees = message.UserIds.Select(id => new Attendee
                {
                    UserId = Guid.Parse(id)
                }).ToList()
            };

            var isSuccesful = _eventService.Create(newEvent);
            if (!isSuccesful)
            {
                return BadRequest();
            }

            // Notify all attendees
            foreach (var id in message.UserIds)
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user != null)
                {
                    _emailService.SendEmail(user.Email, $"Event: {newEvent.Title}",
                        $"You were invited to the <a href='http://localhost:3000/events/{newEvent.Id.ToString()}'>Event</a>");
                }
            }

            return Ok();
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(Update message)
        {
            var currentEvent = _eventService.Get(Guid.Parse(message.Id));
            var currentAttendeesIds = currentEvent.Attendees.Select(a => a.UserId.ToString());

            currentEvent.Title = message.Title;
            currentEvent.Start = message.Start;
            currentEvent.End = message.End;
            currentEvent.AllDay = message.AllDay;
            currentEvent.Details.Description = message.Description;
            currentEvent.Attendees = message.UserIds.Select(id => new Attendee
            {
                UserId = Guid.Parse(id)
            }).ToList();

            var isSuccessful = _eventService.Update(currentEvent);
            if (!isSuccessful)
            {
                return BadRequest();
            }

            // Notify new attendees
            var newAttendeesIds = message.UserIds.Except(currentAttendeesIds);

            foreach (var id in newAttendeesIds)
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user != null)
                {
                    _emailService.SendEmail(user.Email, $"Event: {currentEvent.Title}",
                        $"You were invited to the <a href='http://localhost:3000/events/{currentEvent.Id.ToString()}'>Event</a>");
                }
            }

            return Ok();
        }

        [HttpPost("remove")]
        public async Task<IActionResult> Remove(Remove message)
        {
            var isSuccessgul = _eventService.Delete(Guid.Parse(message.Id));
            if (!isSuccessgul)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}