using System;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Auth
{
    public class User : IdentityUser<Guid>
    {
        public override Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}