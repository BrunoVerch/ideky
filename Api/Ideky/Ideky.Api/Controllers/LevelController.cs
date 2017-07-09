using Ideky.Api.Models;
using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ideky.Api.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/level")]
    public class LevelController : BasicController
    {
        readonly LevelRepository levelRepository;

        public LevelController()
        {
            levelRepository = new LevelRepository();
        }

        [HttpGet, Route("config")]
        public HttpResponseMessage Get()
        {
            return ResponderOK(levelRepository.GetList());
        }

        [HttpPut, Route("edit")]
        public HttpResponseMessage Edit([FromBody] LevelModel levelModel)
        {
            Level level = levelRepository.GetById(levelModel.Id);

            level.UpdateLevelDifficult(levelModel.PictureAmount, levelModel.Duration, levelModel.Multiplier);

            if(level.Validate())
            {
                return ResponderOK(levelRepository.EditLevel(level));
            }
            else
            {
                return ResponderErro(level.Messages);
            }
        }
    }
}