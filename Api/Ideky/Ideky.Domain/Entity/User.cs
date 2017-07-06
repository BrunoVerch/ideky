using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ideky.Domain.Entity
{
    public class User
    {
        public int FacebookId { get; private set; }
        public long Record { get; private set; }
        public int Lifes { get; private set; }
        public DateTime LastLogin { get; private set }

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
    }
}
