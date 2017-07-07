angular
  .module('app')
  .run(function($rootScope, $window) {
    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded
      FB.init({
        appId: '1392336224214575',
        status: true,
        cookie: true,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
      });

      //sAuth.watchAuthenticationStatusChange();
    };
    (function(d){
      // load the Facebook javascript SDK
      var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";

      ref.parentNode.insertBefore(js, ref);

    }(document));
  });