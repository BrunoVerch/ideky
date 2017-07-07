using System;
using System.Collections.Generic;

namespace Ideky.Domain.Entity
{
    public class User : IBasicEntity
    {
        public int FacebookId { get; private set; }
        public long Record { get; private set; }
        public int Lifes { get; private set; }
        public DateTime LastLogin { get; private set; }

        public List<string> Messages { get; private set; }

        protected User() { }

        public User(int facebookId)
        {
            FacebookId = facebookId;
            Record = 0;
            Lifes = 0;
            LastLogin = DateTime.Now;
        }

        public void SetNewLogin()
        {
            LastLogin = DateTime.Now;
        }
     
        public void SetNewRecord(int record)
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
            return Messages.Count == 0;
        }
    }
}
