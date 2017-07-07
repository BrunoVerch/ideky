using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Ideky.Infrastructure.Repository
{
    public class GameResultRepository : IDisposable
    {
        private Context context;

        public List<GameResult> GetList()
        {
            return context.GameResults.ToList();
        }

        public List<GameResult> GetListOrderByScore()
        {
            return context.GameResults.OrderBy(gameResult => gameResult.Score).ToList();
        }

        public GameResult GetById(int id)
        {
            return context.GameResults.FirstOrDefault(gameResult => gameResult.Id == id);
        }

        public List<GameResult> GetByUserId(int userFacebookId)
        {
            return context.GameResults.Where(gameResult => gameResult.User.FacebookId == userFacebookId).ToList();
        }

        public List<GameResult> GetByDate(DateTime gameDate)
        {
            return context.GameResults.Where(gameResult => gameResult.GameDate == gameDate).ToList();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
