angular.module('app').factory('amigosService', function ($http) {

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log('status',response);
    FB.api('/me/invitable_friends?limit=99999', function(response) {
        console.log(response);
    });
  });
}

});
