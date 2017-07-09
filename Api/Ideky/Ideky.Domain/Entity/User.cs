using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ideky.Domain.Entity
{
    public class User : IBasicEntity
    {
        public long Id { get; private set; }
        public long FacebookId { get; private set; }
        public long Record { get; private set; }
        public int Lifes { get; private set; }
        public DateTime LastLogin { get; private set; }

        public List<string> Messages { get; private set; }

        protected User() { Messages = new List<string>();  }

        public User(long facebookId, long record, int lifes, DateTime lastLogin) {
            Id = 0;
            FacebookId = facebookId;
            Record = record;
            Lifes = lifes;
            LastLogin = lastLogin;
            Messages = new List<string>();
        }

        public User(long facebookId)
        {
            Id = 0;
            FacebookId = facebookId;
            Record = 0;
            Lifes = 1;
            LastLogin = DateTime.Now;
            Messages = new List<string>();
        }

        public void SetNewLogin()
        {
            LastLogin = DateTime.Now;
        }
     
        public void SetNewRecord(long record)
        {
            Record = record;
        }

        public void AddLifes()
        {
            Lifes = Lifes + 3;
        }

        public void AddLifes(int lifes)
        {
            Lifes = Lifes + lifes;
        }

        public bool Validate()
        {
            if(Lifes < 0)
            {
                Messages.Add("Número de vidas inválido!");
            }
            if(LastLogin == null)
            {
                Messages.Add("Data de último login inválida!");
            }
            return Messages.Count == 0;
        }
    }
}
