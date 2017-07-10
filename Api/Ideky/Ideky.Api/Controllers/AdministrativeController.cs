using Ideky.Api.App_Start;
using Ideky.Api.Models;
using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System.Net.Http;
using System.Web.Http;

namespace Ideky.Api.Controllers
{
    [RoutePrefix("api/administrative")]
    public class AdministrativeController : BasicController
    {
        readonly AdministrativeRepository admRepository;

        public AdministrativeController()
        {
            admRepository = new AdministrativeRepository();
        }

        [HttpPost, BasicAuthorization]
        [Route("register")]
        public HttpResponseMessage Post([FromBody]AdministrativeModel admModel)
        {
            Administrative admin = admRepository.Register(admModel.Email, admModel.Password);
            if(admin == null)
                return ResponderErro("Email já cadastrado");
            else if (admin.Messages.Count == 0)
                return ResponderOK(admin.Email);
            else
                return ResponderErro(admin.Messages);
        }
    }
}