using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Ideky.Infrastructure.Repository
{
    public class GameResultRepository : IDisposable
    {
        readonly Context Context;

        public GameResultRepository(Context context)
        {
            Context = context;
        }

        public object GetList()
        {
            return Context.GameResults
                .Where(gameResult => gameResult.Active)
                .Select(gameResult => new
                {
                    FacebookId = gameResult.User.FacebookId,
                    Score = gameResult.Score,
                    GameDate = gameResult.GameDate,
                }).ToList();
        }

        public List<GameResult> List()
        {
            return Context.GameResults.ToList();
        }

        public object GetListOrderByScoreGroupedByUser()
        {
            return Context.GameResults
                .Where(gameResult => gameResult.Active)
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
            return Context.GameResults
                .Where(gameResult => gameResult.GameDate.Day == DateTime.Now.Day
                    && gameResult.GameDate.Month == DateTime.Now.Month
                    && gameResult.GameDate.Year == DateTime.Now.Year
                    && gameResult.Active)
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
            return Context.GameResults
                .Where(gameResult => gameResult.GameDate.Month == DateTime.Now.Month
                    && gameResult.GameDate.Year == DateTime.Now.Year
                    && gameResult.Active)
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
            return Context.GameResults
                .Where(gameResult => gameResult.Active)
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
            return Context.GameResults.Where(gameResult => gameResult.Active)
                .FirstOrDefault(g => g.Id == id);
        }

        public object GetByUserId(int userFacebookId)
        {
            return Context.GameResults
                .Where(gameResult => gameResult.Active)
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
            Context.GameResults.Add(gameResult);
            Context.Entry(gameResult.User).State = EntityState.Unchanged;
            Context.SaveChanges();
            return gameResult;
        }

        public int ResetRanking()
        {
            return Context.Database.ExecuteSqlCommand("UPDATE dbo.Game_Result SET Active = 0 WHERE Active = 1");
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
