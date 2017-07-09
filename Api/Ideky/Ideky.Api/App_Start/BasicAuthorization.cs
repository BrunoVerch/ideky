using Ideky.Domain.Entity;
using Ideky.Infrastructure.Repository;
using System;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Ideky.Api.App_Start
{
    public class BasicAuthorization : AuthorizeAttribute
    {
        readonly AdministrativeRepository administrativeRepository;

        public BasicAuthorization()
        {
            administrativeRepository = new AdministrativeRepository();
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                var dnsHost = actionContext.Request.RequestUri.DnsSafeHost;
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                actionContext.Response.Headers.Add("WWW-Authenticate", string.Format("Basic realm=\"{0}\"", dnsHost));
                return;
            }
            else
            {
                string authenticationToken =
                    actionContext.Request.Headers.Authorization.Parameter;

                string decodedTokenAutenticacao =
                    Encoding.Default.GetString(Convert.FromBase64String(authenticationToken));

                string[] userNameAndPassword = decodedTokenAutenticacao.Split(':');

                Administrative adm = null;
                if (ValidateUser(userNameAndPassword[0], userNameAndPassword[1], out adm))
                {
                    string[] roles = new string[1];
                    roles[0] = "Admin";
                    var identity = new GenericIdentity(adm.Email);
                    var genericUser = new GenericPrincipal(identity, roles);

                    if (string.IsNullOrEmpty(Roles))
                    {
                        Thread.CurrentPrincipal = genericUser;
                        if (HttpContext.Current != null)
                            HttpContext.Current.User = genericUser;

                        return;
                    }
                    else
                    {
                        var currentRoles = Roles.Split(',');
                        foreach (var currentRole in currentRoles)
                        {
                            if (genericUser.IsInRole(currentRole))
                            {
                                Thread.CurrentPrincipal = genericUser;
                                if (HttpContext.Current != null)
                                    HttpContext.Current.User = genericUser;

                                return;
                            }
                        }
                    }
                }
            }

            actionContext.Response =
                actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, new { mensagens = new string[] { "Email ou senha inválidos." } });
        }

        private bool ValidateUser(string email, string password, out Administrative administrativeReturn)
        {
            administrativeReturn = null;

            Administrative adm = administrativeRepository.GetByEmail(email);

            if (adm != null && adm.AuthenticatePassword(password))
                administrativeReturn = adm;
            else
                adm = null;

            return adm != null;
        }
    }
}