using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ideky.Api.Controllers
{
    public class BasicController : ApiController
    {
        public HttpResponseMessage ResponderOK(object data = null)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new { data });
        }

        public HttpResponseMessage ResponderErro(params string[] messages)
        {
            return Request.CreateResponse(HttpStatusCode.BadRequest, new { messages });
        }

        public HttpResponseMessage ResponderErro(IEnumerable<string> messages)
        {
            return Request.CreateResponse(HttpStatusCode.BadRequest, new { messages });
        }
    }
}