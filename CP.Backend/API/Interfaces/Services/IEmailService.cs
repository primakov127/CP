namespace API.Interfaces.Services
{
    public interface IEmailService
    {
        public void SendEmail(string recipientEmail, string subject, string message);
    }
}