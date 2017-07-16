using System;
using System.Collections.Generic;

namespace Ideky.Domain.Entity
{
    public class GameResult : BasicEntity
    {
        public int Id { get; private set; }
        public User User { get; private set; }
        public DateTime GameDate { get; private set; }
        public int Score { get; private set; }
        public bool Active { get; private set; }

        protected GameResult() { }

        public GameResult(User user, int score)
        {
            Id = 0;
            User = user;
            GameDate = DateTime.Now;
            Score = score;
            Active = true;
        }

        public GameResult(int id, bool active)
        {
            Id = id;
            Active = active;
        }

        public void Disable()
        {
            Active = false;
        }

        public bool Validate()
        {
            if (User == null)
            {
                Messages.Add("Usuário inválido");
            }
            return Messages.Count == 0;
        }
    }
}
