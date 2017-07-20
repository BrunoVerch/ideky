using Ideky.Domain.Entity;
using System;
using System.Data.Entity;
using System.Linq;

namespace Ideky.Infrastructure.Repository
{
    public class UserRepository : IDisposable
    {
        readonly Context Context;

        public UserRepository(Context context)
        {
            Context = context;
        }

        public object GetByFacebookIdFiltered(long facebookId)
        {
            return Context.Users
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
            return Context.Users.FirstOrDefault(user => user.FacebookId == facebookId);
        }

        public User GetByFacebookIdAttach(long facebookId)
        {
            User userReturn = Context.Users.FirstOrDefault(user => user.FacebookId == facebookId);
            return Context.Users.Attach(userReturn);
        }

        public User ReduceLife(long facebookId)
        {
            var user = GetByFacebookId(facebookId);
            user.ReduceLife();
            Context.Entry(user).State = EntityState.Modified;
            Context.SaveChanges();
            return user;
        }

        public object GetList()
        {
            return Context.Users
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
            return Context.Users.Select(users => new
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
                user = Context.Users.Add(user);
                Context.SaveChanges();
            }

            return user;
        }

        public User Update(User user)
        {
            var newUser = GetByFacebookId(user.FacebookId);

            newUser.SetNewPicture(user.Picture);

            if (newUser.Validate())
            {
                Context.Entry(newUser).State = EntityState.Modified;
                Context.SaveChanges();
            }

            return newUser;
        }

        public User SetNewRecord(long record, long facebookId)
        {
            User user = GetByFacebookId(facebookId);
            user.SetNewRecord(record);
            if (user.Validate())
            {
                Context.Entry(user).State = EntityState.Modified;
                Context.SaveChanges();
            }
            return user;
        }

        public User AddLifes(User user)
        {
            Context.Entry(user).State = EntityState.Modified;
            Context.SaveChanges();

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
                Context.Entry(user).State = EntityState.Modified;
                Context.SaveChanges();
            }
            return user;
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
