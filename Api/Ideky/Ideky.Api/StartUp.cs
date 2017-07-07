using Ideky.Api.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(Ideky.Api.Startup))]
namespace Ideky.Api
{
    public class Startup
    {

        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static FacebookAuthenticationOptions facebookAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            //Configure Facebook External Login
            facebookAuthOptions = new FacebookAuthenticationOptions()
            {
                AppId = "1392336224214575",
                AppSecret = "8bc0388b3b1985a8921166cfd5151ede",
                Provider = new FacebookAuthProvider()
            };
            app.UseFacebookAuthentication(facebookAuthOptions);

            //use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(Microsoft.AspNet.Identity.DefaultAuthenticationTypes.ExternalCookie);
            var OAuthBearerOptions = new OAuthBearerAuthenticationOptions();
        }
    
    }
}