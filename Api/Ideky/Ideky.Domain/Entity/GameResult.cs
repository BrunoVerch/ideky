using System;
using System.Collections.Generic;

namespace Ideky.Domain.Entity
{
    public class GameResult : IBasicEntity
    {
        public int Id { get; private set; }
        public User User { get; private set; }
        public DateTime GameDate { get; private set; }
        public List<string> Messages { get; private set; }

        protected GameResult() { }

        public GameResult(User user)
        {
            Id = 0;
            User = user;
            GameDate = DateTime.Now;
            
        }

        public bool Validate()
        {
            if(User != null)
            {
                Messages.Add("Usuário inválido");
            }
            return Messages.Count == 0;
        }
    }
}
