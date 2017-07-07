using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ideky.Infrastructure.Repository
{
    public class LevelRepository : IDisposable
    {
        private Context context;

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

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
