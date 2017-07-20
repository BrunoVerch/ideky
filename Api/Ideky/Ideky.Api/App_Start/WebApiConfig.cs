using System.Web.Http;
using System.Web.Http.Cors;

namespace Ideky.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            var cors = new EnableCorsAttribute(
                origins: "http://ideky.azurewebsites.net,http://localhost:8080",
                headers: "*",
                methods: "GET,PUT,POST,DELETE"
            );

            config.EnableCors(cors);

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
