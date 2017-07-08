using Ideky.Api.Models;
using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
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
        public HttpResponseMessage Post([FromBody]GameResultModel gameResultModel)
        {
            User user = userRepository.GetByFacebookId(gameResultModel.FacebookID);
            if(user != null)
            {
                List<string> answer = gameResultRepository.RegisterNewGame(user, gameResultModel.Score);
                if (answer == null)
                    return ResponderOK(null);
                else
                    return ResponderErro(answer);
            }
            return ResponderErro("Usuário inválido.");
        }
    
    }
}