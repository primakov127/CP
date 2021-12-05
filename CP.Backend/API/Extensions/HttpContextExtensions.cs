using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpContextExtensions
    {
        public static string GetClaim(this HttpContext context, string key)
        {
            var identity = context.User.Identity as ClaimsIdentity;

            return identity?.FindFirst(key)?.Value;
        }
    }
}