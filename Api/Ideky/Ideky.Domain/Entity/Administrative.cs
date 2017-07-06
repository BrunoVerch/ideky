using System;
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
        public List<string> Messages { get; private set; }

        protected Administrative() { Messages = new List<string>();  }

        public Administrative(string email, string password)
        {
            Email = email;
            if (!string.IsNullOrWhiteSpace(password))
                Password = EncryptPassword(password);
            Messages = new List<string>();
        }

        private string EncryptPassword(string password)
        {
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.Default.GetBytes(Email + password);
            byte[] hash = md5.ComputeHash(inputBytes);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
                sb.Append(hash[i].ToString("x2"));

            Messages = new List<string>();

            return sb.ToString();
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Email))
            {
                Messages.Add("Invalid email address.");
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
    }
}
