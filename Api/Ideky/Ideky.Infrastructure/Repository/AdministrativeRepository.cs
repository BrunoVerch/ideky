using Ideky.Domain.Entity;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Ideky.Infrastructure.Repository
{
    public class AdministrativeRepository : IDisposable
    {
        private Context Context;

        public AdministrativeRepository(Context context)
        {
            Context = context;
        }

        public List<Administrative> GetList()
        {
            return Context.Administratives.ToList();
        }

        public Administrative GetById(int id)
        {
            return Context.Administratives.FirstOrDefault(administrative => administrative.Id == id);
        }
        public Administrative GetByEmail(string email)
        {
            return Context.Administratives.FirstOrDefault(administrative => administrative.Email == email);
        }
        public Administrative Register(Administrative adm)
        {
            Context.Administratives.Add(adm);
            Context.SaveChanges();
            return adm;
        }
        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
