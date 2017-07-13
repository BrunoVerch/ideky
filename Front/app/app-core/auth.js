angular.module('auth', ['ngStorage','toastr']);

angular.module('auth').config(function ($httpProvider) {
  let headerAuth = JSON.parse(window.localStorage.getItem('ngStorage-headerAuth'));
  if (headerAuth) {
    $httpProvider.defaults.headers.common.Authorization = headerAuth;
  }
});

angular.module('auth').factory('authService', function (authConfig, $http, $q, $location, $localStorage) {

  let userUrl = authConfig.userUrl;
  let loginUrl = authConfig.loginUrl;
  let privateUrl = authConfig.privateUrl;
  let logoutUrl = authConfig.logoutUrl;

  function login(user) {
    let deferred = $q.defer();
    let headerAuth = buildHeader(user);

    $http({
      url: userUrl,
      method: 'GET',
      headers: headerAuth
    }).then(
      function (response) {
        $localStorage.loggedUser = response.data;
        $localStorage.headerAuth = buildHeader(user)['Authorization'];
        $http.defaults.headers.common.Authorization = $localStorage.headerAuth;

        if (privateUrl) {
          $location.path(privateUrl);
        }

        deferred.resolve(response);
      },

      function (response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  function logout() {
    delete $localStorage.loggedUser;
    delete $localStorage.Authorization;
    $http.defaults.headers.common.Authorization = undefined;

    if (logoutUrl) {
      $location.path(logoutUrl);
    }
  };

  function getUser() {
    return $localStorage.loggedUser;
  };

  function isAuthenticated() {
    return !!getUser();
  };

  function isNotAuthenticated() {
    return !getUser();
  };

  function hasPermission(permission) {
    return isAuthenticated() && getUser().Permission === permission;
  };

  function hasNotPermission(permission){
    return isAuthenticated() && getUser().Permission !== permission;
  }

  // PROMISE

  function isAuthenticatedPromise() {

    let deferred = $q.defer();

    if (isAuthenticated()) {
      deferred.resolve();

    } else {
      $location.path(urlLogin);
      deferred.reject();
    }

    return deferred.promise;
  };

  function hasPermissionPromise(permission) {

    let deferred = $q.defer();

    if (hasPermission(permission)) {
      deferred.resolve();

    } else {
      deferred.reject();
    }

    return deferred.promise;
  };

  function buildHeader(user) {
    let hash = window.btoa(`${user.email}:${user.password}`);
    return {
      'Authorization': `Basic ${hash}`
    };
  };

  return {
    login: login,
    logout: logout,
    getUser: getUser,
    hasPermission: hasPermission,
    isAuthenticated: isAuthenticated,
    isAuthenticatedPromise: isAuthenticatedPromise,
    hasNotPermission: hasNotPermission,
    isNotAuthenticated: isNotAuthenticated,
    hasPermissionPromise: hasPermissionPromise
  };
});