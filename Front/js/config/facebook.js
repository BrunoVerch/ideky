window.fbAsyncInit = function() {
  FB.init({
    appId            : '1392336224214575',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.9'
  });
  FB.AppEvents.logPageView();

};

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log('status',response);
    FB.api('/me/invitable_friends?limit=99999', function(response) {
        console.log(response);
    });
  });
}

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
