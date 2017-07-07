angular.module('app').factory('userService', function ($http) {

  const url = 'http://localhost:60550/api/auth'

  return {
    login: login,
    getFriends: getFriends
  }

  function login () {
    return $http.get(`${url}/ExternalLogin?provider=Facebook`);
  }

  //invitable_friends
  function getFriends(type, callback) {
    return FB.api(`/me/${type}?limit=99999`,  callback);
  }

});
