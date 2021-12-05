using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.Messages
{
    public class Login
    {
        [Required]
        public string UserNameOrEmail { get; set; }
        
        [Required]
        [MinLength(3)]
        public string Password { get; set; }
    }

    public class Register
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        [MinLength(3)]
        public string Password { get; set; }
    }

    public class RequestPasswordReset
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }

    public class ResetPassword
    {
        [Required]
        public string UserId { get; set; }
        
        [Required]
        public string ResetToken { get; set; }
        
        [Required]
        [MinLength(3)]
        public string NewPassword { get; set; }
    }
    
    public class LoginResult
    {
        public Guid UserId { get; set; }
        public string Token { get; set; }
    }
}