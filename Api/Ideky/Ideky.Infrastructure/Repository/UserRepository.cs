using Ideky.Domain.Entity;
using System;
using System.Data.Entity;
using System.Linq;

namespace Ideky.Infrastructure.Repository
{
    public class UserRepository : IDisposable
    {
        private Context context;

        public UserRepository()
        {
            context = new Context();
        }

        public object GetByFacebookIdFiltered(long facebookId)
        {
            return context.Users
                        .Select(user => new
                        {
                            FacebookId = user.FacebookId,
                            Id = user.Id,
                            Record = user.Record,
                            Lifes = user.Lifes,

                        })
                        .FirstOrDefault(user => user.FacebookId == facebookId);
        }

        public User GetByFacebookId(long facebookId)
        {
            return context.Users.FirstOrDefault(user => user.FacebookId == facebookId);
        }

        public User ReduceLife(long facebookId)
        {
            var user = GetByFacebookId(facebookId);
            user.ReduceLife();
            context.Entry(user).State = EntityState.Modified;
            context.SaveChanges();
            return user;
        }

        public object GetList()
        {
            return context.Users
                            .Select(users => new
                            {
                                FacebookId = users.FacebookId,
                                Record = users.Record,
                                Lifes = users.Lifes,
                                LastLogin = users.LastLogin
                            }).ToList();
        }

        public object GetListOrderByRecord()
        {
            return context.Users.Select(users => new
            {
                FacebookId = users.FacebookId,
                Record = users.Record,
                Lifes = users.Lifes,
                LastLogin = users.LastLogin
            })
                                 .OrderBy(users => users.Record).ToList();
        }

        public User Save(User user)
        {
            if (user.Validate())
            {
                user = context.Users.Add(user);
                context.SaveChanges();
            }

            return user;
        }

        public User Update(User user)
        {
            var newUser = GetByFacebookId(user.FacebookId);

            newUser.SetNewPicture(user.Picture);

            if (newUser.Validate())
            {
                context.Entry(newUser).State = EntityState.Modified;
                context.SaveChanges();
            }

            return newUser;
        }

        public User SetNewRecord(long record, long facebookId)
        {
            User user = GetByFacebookId(facebookId);
            user.SetNewRecord(record);
            if (user.Validate())
            {
                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();
            }
            return user;
        }

        public User AddLifes(User user)
        {
            context.Entry(user).State = EntityState.Modified;
            context.SaveChanges();

            return user;
        }

        public User SetNewLogin(long facebookId)
        {
            User user = GetByFacebookId(facebookId);
            if (user == null)
            {
                return null;
            }
            user.SetNewLogin();
            if (user.Validate())
            {
                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();
            }
            return user;
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
