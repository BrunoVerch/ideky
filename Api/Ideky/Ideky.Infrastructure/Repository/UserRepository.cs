using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ideky.Infrastructure.Repository
{
    public class UserRepository : IDisposable
    {
        private Context context;

        public User GetByFacebookId(int facebookId)
        {
            return context.Users.FirstOrDefault(user => user.FacebookId == facebookId);
        }

        public List<User> GetList()
        {
            return context.Users.ToList();
        }

        public List<User> GetListOrderByRecord()
        {
            return context.Users.OrderBy(users => users.Record).ToList();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
