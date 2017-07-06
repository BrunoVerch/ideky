function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log('status',response);
    FB.api(`/${response.authResponse.userID}/friends`, function(response) {
        console.log(response);
    });
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId            : '1333084840143885',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.9'
  });
  FB.AppEvents.logPageView();

};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));