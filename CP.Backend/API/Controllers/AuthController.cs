using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Interfaces.Services;
using API.Messages;
using API.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<User> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(Login message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByEmailAsync(message.UserNameOrEmail) ??
                       await _userManager.FindByNameAsync(message.UserNameOrEmail);

            if (user == null)
            {
                return BadRequest();
            }

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, message.Password);
            if (!isPasswordCorrect)
            {
                return BadRequest();
            }

            var claims = new[]
            {
                new Claim("userId", user.Id.ToString()),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName),
                new Claim("email", user.Email),
                new Claim("userName", user.UserName)
            };
            var signatureKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the key that we will use in the encryption"));
            var token = new JwtSecurityToken(
                issuer: "CP",
                audience: "CP",
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: new SigningCredentials(signatureKey, SecurityAlgorithms.HmacSha256)
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new LoginResult
            {
                UserId = user.Id,
                Token = tokenString
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(Register message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = new User
            {
                Email = message.Email,
                UserName = message.UserName,
                FirstName = message.FirstName,
                LastName = message.LastName
            };

            var isSuccessful = (await _userManager.CreateAsync(user, message.Password)).Succeeded;
            if (!isSuccessful)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("requestpasswordreset")]
        public async Task<IActionResult> RequestPasswordResetAsync(RequestPasswordReset message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByEmailAsync(message.Email);
            if (user == null)
            {
                return Ok();
            }

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            // TODO: Send Frontend link with UserId and ResetToken
            _emailService.SendEmail(user.Email, "CP: Password Recovery", resetToken);

            return Ok();
        }

        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPasswordAsync(ResetPassword message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(message.UserId);
            if (user == null)
            {
                return BadRequest();
            }

            var isSuccessful = (await _userManager.ResetPasswordAsync(user, message.ResetToken, message.NewPassword))
                .Succeeded;
            if (!isSuccessful)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}