using Ideky.Infrastructure.Repository;
using System.Net.Http;
using System.Web.Http;
using Microsoft.CSharp.RuntimeBinder;
using Ideky.Api.Models;
using System.Data.Entity.Infrastructure;
using Ideky.Domain.Entity;
using Ideky.Api.App_Start;

namespace Ideky.Api.Controllers
{
    [RoutePrefix("user")]
    public class UserController : BasicController
    {
        readonly UserRepository userRepository;

        public UserController()
        {
            userRepository = new UserRepository(Context);
        }

        [HttpPost, Authorize]
        [Route("register")]
        public HttpResponseMessage Post([FromBody]UserModel userModel)
        {
            try
            {
                var user = new User(userModel.FacebookId, userModel.Name, userModel.Picture);

                if (user.Validate())
                {
                    user = userRepository.Save(user);
                    return ResponderOK(user);
                }
                else
                {
                    return ResponderErro(user.Messages);
                }
            }
            catch (RuntimeBinderException)
            {
                return ResponderErro("Tipos de atributos inválidos");
            }
            catch (DbUpdateException)
            {
                return ResponderErro("Facebook já cadastrado");
            }
        }

        [HttpGet, Authorize]
        [Route("getByFacebookId/{facebookId:long}")]
        public HttpResponseMessage GetByFacebookId(long facebookId)
        {
            var user = userRepository.GetByFacebookIdFiltered(facebookId);

            if (user == null)
                return ResponderErro("Usuário não encontrado.");

            return ResponderOK(user);
        }

        [HttpPost, Authorize]
        [Route("setNewRecord")]
        public HttpResponseMessage SetNewRecord([FromBody]UserModel userModel)
        {
            User user = userRepository.SetNewRecord(userModel.Record, userModel.FacebookId);
            if (user.Messages.Count == 0) return ResponderOK(user);
            else return ResponderErro(user.Messages);
        }

        [HttpPost, Authorize]
        [Route("setNewLogin")]
        public HttpResponseMessage SetNewLogin(UserModel userModel)
        {
            User user = userRepository.SetNewLogin(userModel.FacebookId);
            if (user == null)
                return ResponderErro("Usuário inexistente.");
            else if (user.Messages.Count == 0)
                return ResponderOK(user);
            else
                return ResponderErro(user.Messages);
        }

        [HttpPut, Authorize]
        [Route("updatePicture")]
        public HttpResponseMessage UpdatePicture(UserModel userModel)
        {
            User user = new User(userModel.FacebookId, userModel.Name, userModel.Picture);

            if (user.Validate())
                return ResponderOK(userRepository.Update(user));
            else
                return ResponderErro(user.Messages);
        }

        [HttpPut, Authorize]
        [Route("updateLifes")]
        public HttpResponseMessage UpdateLifes(UserModel userModel)
        {
            User user = userRepository.GetByFacebookId(userModel.FacebookId);

            user.AddDailyLifes();

            return ResponderOK(user);
        }

        [HttpPut, Authorize]
        [Route("reduceLife")]
        public HttpResponseMessage ReduceLife(UserModel userModel)
        {
            User user = userRepository.ReduceLife(userModel.FacebookId);
            if (user.Validate())
                return ResponderOK(userRepository.Update(user));
            else
                return ResponderErro(user.Messages);
        }

        [HttpPut, BasicAuthorization]
        [Route("lifes")]
        public HttpResponseMessage AddLifes([FromBody]UserLifesModel userModel)
        {
            User user = userRepository.GetByFacebookId(userModel.FacebookId);

            if (user != null)
            {
                if (userModel.Lifes <= 0)
                {
                    return ResponderErro("Quantidade de vida inválida");
                }
                else if (user.Validate())
                {
                    user.AddLifes(userModel.Lifes);
                    userRepository.AddLifes(user);
                }
                else
                {
                    return ResponderErro(user.Messages);
                }
            }
            else
            {
                return ResponderErro("Usuário inválido");
            }

            return ResponderOK(user);
        }
        protected override void Dispose(bool disposing)
        {
            userRepository.Dispose();
        }
    }
}