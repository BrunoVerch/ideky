using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Ideky.Domain.Entity
{
    public class Administrative : BasicEntity
    {
        public int Id { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }

        protected Administrative(){ }
        public Administrative(string email, string password)
        {
            Email = email;
            if (!string.IsNullOrWhiteSpace(password))
                Password = EncryptPassword(password);
        }

        private string EncryptPassword(string password)
        {
            var hashAlgorithm = SHA512.Create();
            var encodedValue = Encoding.UTF8.GetBytes(Email + password);
            var encryptedPassword = hashAlgorithm.ComputeHash(encodedValue);
            var sb = new StringBuilder();
            foreach (var caracter in encryptedPassword)
            {
                sb.Append(caracter.ToString("X2"));
            }
            return sb.ToString();
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Email))
            {
                Messages.Add("Endereço de email inválido");
            }
            if (string.IsNullOrWhiteSpace(Password))
            {
                Messages.Add("Senha inválida");
            }
            if (Email.Length > 100)
            {
                Messages.Add("Endereço de email longo demais");
            }
            return Messages.Count == 0;
        }

        public bool ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return false;
            }
            return true;
        }

        public bool AuthenticatePassword(string password)
        {
            return EncryptPassword(password) == Password;
        }
    }
}
