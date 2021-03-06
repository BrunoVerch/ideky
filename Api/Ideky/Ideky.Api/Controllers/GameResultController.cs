﻿using Ideky.Api.App_Start;
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
    [RoutePrefix("game")]
    public class GameResultController : BasicController
    {
        readonly GameResultRepository gameResultRepository;
        readonly UserRepository userRepository;

        public GameResultController()
        {
            gameResultRepository = new GameResultRepository(Context);
            userRepository = new UserRepository(Context);
        }

        [HttpPost, Authorize]
        [Route("register")]
        public HttpResponseMessage Register([FromBody]GameResultModel gameResultModel)
        {
            String name = HttpContext.Current.User.Identity.Name;
            User user = userRepository.GetByFacebookId(gameResultModel.FacebookID);
            if (user != null && user.Name.Equals(name))
            {
                if (user.Record < gameResultModel.Score)
                {
                    user = userRepository.SetNewRecord(gameResultModel.Score, gameResultModel.FacebookID);
                }
                GameResult gameResult = new GameResult(user, gameResultModel.Score);
                if (gameResult.Validate())
                {
                    gameResult = gameResultRepository.RegisterNewGame(gameResult);
                    GameResultModelReturn answerObject = new GameResultModelReturn(gameResult.Id, gameResult.User.FacebookId, gameResult.Score, gameResult.GameDate);
                    return ResponderOK(answerObject);
                }
                return ResponderErro(gameResult.Messages);
            }
            return ResponderErro("Usuário inválido");
        }

        [HttpGet, Authorize]
        [Route("monthlyRanking")]
        public HttpResponseMessage GetMonthlyRanking()
        {
            var result = gameResultRepository.GetListOrderByScoreGroupedByUserWhereDateIsInCurrentMonth();
            return ResponderOK(result);
        }
        [HttpGet, Authorize]
        [Route("dailyRanking")]
        public HttpResponseMessage GetDailyRanking()
        {
            var result = gameResultRepository.GetListOrderByScoreGroupedByUserWhereDateIsToday();
            return ResponderOK(result);
        }
        [HttpGet, Authorize]
        [Route("overallRanking")]
        public HttpResponseMessage GetOverallRanking()
        {
            var result = gameResultRepository.GetListOrderByScoreGroupedByUser();
            return ResponderOK(result);
        }
        
        [HttpPut, Authorize]
        [Route("friendsranking")]
        public HttpResponseMessage GetOverallRanking(FriendsModel[] friends)
        {
            List<User> users = new List<User>();
            foreach(FriendsModel element in friends)
            {
                User user = userRepository.GetByFacebookId(element.id);
                if(user != null)
                {
                    users.Add(user);
                }
            }

            users.Select(u => new
            {
                FacebookId = u.FacebookId,
                Name = u.Name,
                Picture = u.Picture,
                Record = u.Record
            }).ToList().Sort((x,y) => y.Record.CompareTo(x.Record));

            return ResponderOK(users);
        }

        [HttpGet, Authorize]
        [Route("getById/{id:long}")]
        public HttpResponseMessage GetById(int id)
        {
            var result = gameResultRepository.GetById(id);
            return ResponderOK(result);
        }
        [HttpGet, Authorize]
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

        protected override void Dispose(bool disposing)
        {
            userRepository.Dispose();
            gameResultRepository.Dispose();
        }
    }
}