using System;

namespace Ideky.Domain.Entity
{
    public class User : BasicEntity
    {
        private string user_id;
        private string providerKey;
        private string userName;

        public long Id { get; private set; }
        public long FacebookId { get; private set; }
        public string Name { get; private set; }
        public string Picture { get; private set; }
        public long Record { get; private set; }
        public int Lifes { get; private set; }
        public string LocalToken { get; private set; }
        public DateTime LastLogin { get; private set; }

        protected User() { }

        public User(long facebookId, string name, string picture, long record, int lifes, DateTime lastLogin)
        {
            Id = 0;
            FacebookId = facebookId;
            Name = name;
            Picture = picture;
            Record = record;
            Lifes = lifes;
            LastLogin = lastLogin;
        }

        public User(long facebookId, string name, string picture)
        {
            Id = 0;
            FacebookId = facebookId;
            Name = name;
            Picture = picture;
            Record = 0;
            Lifes = 1;
            LastLogin = DateTime.Now;
        }

        public User(string user_id)
        {
            this.user_id = user_id;
        }

        public User(string providerKey, string userName)
        {
            this.providerKey = providerKey;
            this.userName = userName;
        }

        public void SetNewName(string name)
        {
            Name = name;
        }

        public void SetNewPicture(string picture)
        {
            Picture = picture;
        }

        public void ReduceLife()
        {
            Lifes--;
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

        public void UpdateToken(string token)
        {
            LocalToken = token;
        }

        public bool Validate()
        {
            if (Name.Length == 0)
            {
                Messages.Add("Nome inválido.");
            }
            if (Lifes < 0)
            {
                Messages.Add("Número de vidas inválido.");
            }
            if (LastLogin == null)
            {
                Messages.Add("Data de último login inválida.");
            }
            if (Record < 0)
            {
                Messages.Add("Record inválido.");
            }
            return Messages.Count == 0;
        }

        public void AddDailyLifes()
        {
            if(LastLogin.Day < DateTime.Now.Day)
            {
                AddLifes(3);
            }
        }
    }
}
