using Ideky.Api.App_Start;
using Ideky.Api.Models;
using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace Ideky.Api.Controllers
{
    [BasicAuthorization]
    [RoutePrefix("administrative")]
    public class AdministrativeController : BasicController
    {
        readonly AdministrativeRepository admRepository;

        public AdministrativeController()
        {
            admRepository = new AdministrativeRepository();
        }

        [HttpPost]
        [Route("register")]
        public HttpResponseMessage Post([FromBody]AdministrativeModel admModel)
        {
           Administrative admin = new Administrative(admModel.Email, admModel.Password);
           admin = admRepository.Register(admin);
           if (admin.Messages.Count > 0)
           {
                return ResponderErro(admin.Messages);
           }
            return ResponderOK(admin.Email);              
        }

        [HttpGet]
        [Route("get")]
        public HttpResponseMessage getAdm()
        {
            Administrative admin = admRepository.GetByEmail(Thread.CurrentPrincipal.Identity.Name);

            if (admin == null)
            {
                return ResponderErro("Administrador inválido.");
            }
            return ResponderOK(new { admin.Id, admin.Email });
        }
    }
}