using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Ideky.Infrastructure.Repository
{
    public class LevelRepository : IDisposable
    {
        private Context Context;

        public LevelRepository(Context context)
        {
            Context = context;
        }

        public Level GetById(int id)
        {
            return Context.Levels.FirstOrDefault(level => level.Id == id);
        }

        public Level GetByLevelNumber(int levelNumber)
        {
            return Context.Levels.FirstOrDefault(level => level.LevelNumber == levelNumber);
        }

        public List<Level> GetList()
        {
            return Context.Levels.ToList();
        }

        public Level EditLevel(Level level)
        {
            Context.Entry(level).State = EntityState.Modified;
            Context.SaveChanges();

            return level;
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
