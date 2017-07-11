using Ideky.Infrastructure.Repository;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using Microsoft.CSharp.RuntimeBinder;
using Ideky.Api.Models;
using System.Data.Entity.Infrastructure;
using Ideky.Domain.Entity;
using Ideky.Api.App_Start;

namespace Ideky.Api.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/user")]
    public class UserController : BasicController
    {
        readonly UserRepository userRepository;

        public UserController()
        {
            userRepository = new UserRepository();
        }

        [HttpPost]
        [Route("register")]
        public HttpResponseMessage Post([FromBody]UserModel userModel)
        {
            try
            {
                List<string> answer = userRepository.CreateNewUser(userModel.FacebookId, userModel.Name, userModel.Picture);
                if (answer == null)
                    return ResponderOK(null);
                else
                    return ResponderErro(answer);
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

        [HttpGet]
        [Route("getByFacebookId/{facebookId:long}")]
        public HttpResponseMessage GetByFacebookId(long facebookId)
        {
            var user = userRepository.GetByFacebookIdFiltered(facebookId);

            if (user == null)
                return ResponderErro("Usuário não encontrado.");

            return ResponderOK(user);
        }

        [HttpPost]
        [Route("setNewRecord")]
        public HttpResponseMessage SetNewRecord([FromBody]UserModel userModel)
        {
            User user = userRepository.SetNewRecord(userModel.Record, userModel.FacebookId);
            if (user.Messages.Count > 0) {
                return ResponderErro(user.Messages);
            }
            return ResponderOK(user);
        }

        [HttpPost]
        [Route("setNewLogin")]
        public HttpResponseMessage SetNewLogin(UserModel userModel)
        {
            User user = userRepository.SetNewLogin(userModel.FacebookId);
            if (user.Messages.Count > 0)
            {
                return ResponderErro(user.Messages);
            }
            return ResponderOK(user);       
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
    }
}