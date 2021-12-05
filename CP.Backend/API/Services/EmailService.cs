using System.Net;
using System.Net.Mail;
using API.Interfaces.Services;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;
        
        public EmailService(string smtpHost, int port, string email, string password)
        {
            _smtpClient = new SmtpClient(smtpHost)
            {
                Port = port,
                Credentials = new NetworkCredential(email, password),
                EnableSsl = true
            };
            _fromEmail = email;
        }
        
        public void SendEmail(string recipientEmail, string subject, string message)
        {
            _smtpClient.Send(_fromEmail, recipientEmail, subject, message);
        }
    }
}