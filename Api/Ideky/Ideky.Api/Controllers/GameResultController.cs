using Ideky.Api.App_Start;
using Ideky.Api.Models;
using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System.Net.Http;
using System.Web.Http;

namespace Ideky.Api.Controllers
{
    [Authorize]
    [RoutePrefix("game")]
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
            if(gameResultModel == null) {
                return ResponderErro("Dados inválidos");
            }
            GameResult gameResult = gameResultRepository.RegisterNewGame(gameResultModel.FacebookID, gameResultModel.Score);
            if (gameResult.Messages.Count > 0)
            {
                return ResponderErro(gameResult.Messages);
            }
            GameResultModelReturn answerObject;
            answerObject = new GameResultModelReturn(gameResult.Id, gameResult.User.FacebookId, gameResult.Score, gameResult.GameDate);
            return ResponderOK(answerObject);
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

        [HttpPut, BasicAuthorization, Route("reset")]
        public HttpResponseMessage ResetRankings()
        {
            return ResponderOK(gameResultRepository.ResetRanking());
        }
    }
}