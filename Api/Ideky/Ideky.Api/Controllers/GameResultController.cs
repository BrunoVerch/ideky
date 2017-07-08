using Ideky.Api.Models;
using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;

namespace Ideky.Api.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/game")]
    public class GameResultController : BasicController
    {
        readonly GameResultRepository gameResultRepository;
        readonly UserRepository userRepository;

        public GameResultController()
        {
            gameResultRepository = new GameResultRepository();
            userRepository = new UserRepository();
        }

        [HttpPost]
        [Route("register")]
        public HttpResponseMessage Register([FromBody]GameResultModel gameResultModel)
        {
            User user = userRepository.GetByFacebookId(gameResultModel.FacebookID);
            if (user != null)
            {
                List<string> answer = gameResultRepository.RegisterNewGame(user, gameResultModel.Score);
                if (answer == null)
                    return ResponderOK(null);
                else
                    return ResponderErro(answer);
            }
            return ResponderErro("Usuário inválido.");
        }

        [HttpGet]
        [Route("monthlyRanking")]
        public HttpResponseMessage GetMonthlyRanking()
        {
            var result = gameResultRepository.GetListOrderByScoreGroupedByUserWhereDateIsInCurrentMonth();
            return ResponderOK(result);
        }
        [HttpGet]
        [Route("dailyRanking")]
        public HttpResponseMessage GetDailyRanking()
        {
            var result = gameResultRepository.GetListOrderByScoreGroupedByUserWhereDateIsToday();
            return ResponderOK(result);
        }
        [HttpGet]
        [Route("overallRanking")]
        public HttpResponseMessage GetOverallRanking()
        {
            var result = gameResultRepository.GetListOrderByScoreGroupedByUser();
            return ResponderOK(result);
        }
        [HttpGet]
        [Route("getById/{id:long}")]
        public HttpResponseMessage GetById(int id)
        {
            var result = gameResultRepository.GetById(id);
            return ResponderOK(result);
        }
        [HttpGet]
        [Route("getList")]
        public HttpResponseMessage GetList()
        {
            var result = gameResultRepository.GetList();
            return ResponderOK(result);
        }

        [HttpPut, Route("reset")]
        public HttpResponseMessage ResetRankings()
        {
            return ResponderOK(gameResultRepository.ResetRanking());
        }
    }
}