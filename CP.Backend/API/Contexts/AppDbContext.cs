using API.Models.Event;
using Microsoft.EntityFrameworkCore;

namespace API.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        
        public DbSet<Event> Events { get; set; }
        public DbSet<EventDetails> EventsDetails { get; set; }
        public DbSet<Attendee> Attendees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>().ToTable("Event");
            modelBuilder.Entity<EventDetails>().ToTable("EventDetails");
            modelBuilder.Entity<Attendee>().ToTable("Attendee");
        }
    }
}