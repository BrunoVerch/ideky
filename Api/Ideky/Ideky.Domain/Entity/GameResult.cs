using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace Ideky.Domain.Entity
{
    public class GameResult : IBasicEntity
    {
        public int Id { get; private set; }
        public User User { get; private set; }
        public DateTime GameDate { get; private set; }
        public int Score { get; private set; }
        public bool Ativo { get; private set; }

        public List<string> Messages { get; private set; }

        protected GameResult() { Messages = new List<string>();  }

        public GameResult(User user, int score)
        {
            Id = 0;
            User = user;
            GameDate = DateTime.Now;
            Score = score;
            Ativo = true;
            Messages = new List<string>();
        }

        public bool Validate()
        {
            if(User == null)
            {
                Messages.Add("Usuário inválido");
            }
            return Messages.Count == 0;
        }
    }
}
