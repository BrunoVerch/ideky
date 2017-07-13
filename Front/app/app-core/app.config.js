angular
  .module('app')
  .config(function ($httpProvider) {
      $httpProvider.interceptors.push('httpInterceptor');
  })
  .run(function($rootScope, $window, $q) {
    const deffered = $q.defer();
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

      setTimeout(() => deffered.resolve(FB), 3000);
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
    
    $rootScope.sdkLoad = deffered.promise;
  });
