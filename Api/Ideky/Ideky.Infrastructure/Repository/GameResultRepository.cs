using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Ideky.Infrastructure.Repository
{
    public class GameResultRepository : IDisposable
    {
        private Context context;

        public GameResultRepository()
        {
            context = new Context();
        }

        public object GetList()
        {
            return context.GameResults
                .Where(gameResult => gameResult.Active == true)
                .Select(gameResult => new
                {
                    FacebookId = gameResult.User.FacebookId,
                    Score = gameResult.Score,
                    GameDate = gameResult.GameDate,
                }).ToList();
        }

        public List<GameResult> List()
        {
            return context.GameResults.ToList();
        }

        public object GetListOrderByScoreGroupedByUser()
        {
            return context.GameResults
                .Where(gameResult => gameResult.Active == true)
                .GroupBy(gameResult => gameResult.User)
                .Select(gameResultGrouped => new
                {
                    FacebookId = gameResultGrouped.Key.FacebookId,
                    Score = gameResultGrouped.Max(gameResult => gameResult.Score),
                    Name = gameResultGrouped.Key.Name,
                    Picture = gameResultGrouped.Key.Picture
                })
                .OrderByDescending(gameResult => gameResult.Score)
                .Take(20)
                .ToList();
        }

        public object GetListOrderByScoreGroupedByUserWhereDateIsToday()
        {
            return context.GameResults
                .Where(gameResult => gameResult.GameDate.Day == DateTime.Now.Day
                    && gameResult.GameDate.Month == DateTime.Now.Month
                    && gameResult.GameDate.Year == DateTime.Now.Year
                    && gameResult.Active == true)
                .GroupBy(gameResult => gameResult.User)
                .Select(gameResultGrouped => new
                {
                    FacebookId = gameResultGrouped.Key.FacebookId,
                    Score = gameResultGrouped.Max(gameResult => gameResult.Score),
                    Name = gameResultGrouped.Key.Name,
                    Picture = gameResultGrouped.Key.Picture
                })
                .OrderByDescending(gameResult => gameResult.Score)
                .Take(20)
                .ToList();
        }

        public object GetListOrderByScoreGroupedByUserWhereDateIsInCurrentMonth()
        {
            return context.GameResults
                .Where(gameResult => gameResult.GameDate.Month == DateTime.Now.Month
                    && gameResult.GameDate.Year == DateTime.Now.Year
                    && gameResult.Active == true)
                .GroupBy(gameResult => gameResult.User)
                .Select(gameResultGrouped => new
                {
                    FacebookId = gameResultGrouped.Key.FacebookId,
                    Score = gameResultGrouped.Max(gameResult => gameResult.Score),
                    Name = gameResultGrouped.Key.Name,
                    Picture = gameResultGrouped.Key.Picture
                })
                .OrderByDescending(gameResult => gameResult.Score)
                .Take(20)
                .ToList();
        }

        public object GetResumeById(int id)
        {
            return context.GameResults
                .Where(gameResult => gameResult.Active == true)
                .Select(gameResult => new
                {
                    Id = gameResult.Id,
                    GameDate = gameResult.GameDate,
                    Score = gameResult.Score,
                    FacebookId = gameResult.User.FacebookId
                })
                .FirstOrDefault(gameResult => gameResult.Id == id);
        }

        public GameResult GetById(int id)
        {
            return context.GameResults.FirstOrDefault(g => g.Id == id);
        }

        public object GetByUserId(int userFacebookId)
        {
            return context.GameResults
            .Where(gameResult => gameResult.Active == true)
            .Select(gameResult => new
            {
                Id = gameResult.Id,
                GameDate = gameResult.GameDate,
                Score = gameResult.Score,
                FacebookId = gameResult.User.FacebookId
            })
            .Where(gameResult => gameResult.FacebookId == userFacebookId)
            .GroupBy(gameResult => gameResult.FacebookId).ToList();
        }

        public GameResult RegisterNewGame(GameResult gameResult)
        {
            context.GameResults.Add(gameResult);
            context.SaveChanges();
            return gameResult;
        }

        public int ResetRanking()
        {
            return context.Database.ExecuteSqlCommand("UPDATE dbo.Game_Result SET Active = 0");
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
