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
    }
}