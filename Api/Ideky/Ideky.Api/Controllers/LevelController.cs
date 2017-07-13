using Ideky.Api.App_Start;
using Ideky.Api.Models;
using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System.Net.Http;
using System.Web.Http;

namespace Ideky.Api.Controllers
{
<<<<<<< Updated upstream
=======
    [Authorize]
>>>>>>> Stashed changes
    [RoutePrefix("level")]
    public class LevelController : BasicController
    {
        readonly LevelRepository levelRepository;

        public LevelController()
        {
            levelRepository = new LevelRepository();
        }

        [HttpGet, Route("get")]
        public HttpResponseMessage Get()
        {
            return ResponderOK(levelRepository.GetList());
        }

        [HttpPut, BasicAuthorization, Route("edit")]
        public HttpResponseMessage Edit([FromBody] LevelModel levelModel)
        {
            Level level = levelRepository.GetById(levelModel.Id);

            level.UpdateLevelDifficult(levelModel.PictureAmount, levelModel.Duration, levelModel.Multiplier);

            if(level.Validate())
            {
                return ResponderOK(levelRepository.EditLevel(level));
            }
            return ResponderErro(level.Messages);
        }
    }
}