using Ideky.Domain.Entity;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Ideky.Infrastructure.Repository
{
    public class AdministrativeRepository : IDisposable
    {
        private Context context;

        public AdministrativeRepository()
        {
            context = new Context();
        }

        public List<Administrative> GetList()
        {
            return context.Administratives.ToList();
        }

        public Administrative GetById(int id)
        {
            return context.Administratives.FirstOrDefault(administrative => administrative.Id == id);
        }
        public Administrative GetByEmail(string email)
        {
            return context.Administratives.FirstOrDefault(administrative => administrative.Email == email);
        }
        public Administrative Register(Administrative adm)
        {
            if (adm.Validate())
            {
                context.Administratives.Add(adm);
                context.SaveChanges();
            }
            return adm;
        }
        public void Dispose()
        {
            context.Dispose();
        }
    }
}
