using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using API.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public UserController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            var userId = HttpContext.GetClaim("userId");
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest();
            }

            var users = _userManager.Users.Select(u => new {FullName = $"{u.FirstName} {u.LastName}", UserId = u.Id.ToString()});

            return Ok(users);
        }
    }
}