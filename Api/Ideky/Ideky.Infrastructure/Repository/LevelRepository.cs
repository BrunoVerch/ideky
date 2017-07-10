using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Ideky.Infrastructure.Repository
{
    public class LevelRepository : IDisposable
    {
        private Context context;

        public LevelRepository()
        {
            context = new Context();
        }

        public Level GetById(int id)
        {
            return context.Levels.FirstOrDefault(level => level.Id == id);
        }

        public Level GetByLevelNumber(int levelNumber)
        {
            return context.Levels.FirstOrDefault(level => level.LevelNumber == levelNumber);
        }

        public List<Level> GetList()
        {
            return context.Levels.ToList();
        }

        public Level EditLevel(Level level)
        {
            context.Entry(level).State = EntityState.Modified;
            context.SaveChanges();

            return level;
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
