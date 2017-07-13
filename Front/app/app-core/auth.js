angular.module('auth', ['ngStorage','toastr']);

angular.module('auth').config(function ($httpProvider) {
  let headerAuth = JSON.parse(window.localStorage.getItem('ngStorage-headerAuth'));
  if (headerAuth) {
    $httpProvider.defaults.headers.common.Authorization = headerAuth;
  }
});

angular.module('auth').factory('authService', function (authConfig, $http, $q, $location, $localStorage) {

  let userAdmUrl = authConfig.userAdmUrl;
  let loginAdmUrl = authConfig.loginAdmUrl;
  let privateAdmUrl = authConfig.privateAdmUrl;
  let logoutAdmUrl = authConfig.logoutAdmUrl;
  let loginFacebookUrl = authConfig.loginFacebookUrl;

  function login(user) {
    let deferred = $q.defer();
    let headerAuth = buildHeader(user);

    $http({
      url: userAdmUrl,
      method: 'GET',
      headers: headerAuth
    }).then(
      function (response) {
        $localStorage.loggedUser = response.data;
        $localStorage.headerAuth = buildHeader(user)['Authorization'];
        $http.defaults.headers.common.Authorization = $localStorage.headerAuth;

        if (privateAdmUrl) {
          $location.path(privateAdmUrl);
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

    if (urlLogout) {
      $location.path(logoutAdmUrl);
    }
  };

  function getUser() {
    return $localStorage.loggedUser;
  };
  
  function facebookLogged() {
    return $localStorage.authorizationData;
  }

  function isAuthenticatedAdm() {
    return !!getUser();
  };

  function isAuthenticatedFacebook() {
    return !!facebookLogged();
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

  function isAuthenticatedAdmPromise() {
    let deferred = $q.defer();

    if (isAuthenticatedAdm()) {
      deferred.resolve();
    } else {
      $location.path(loginAdmUrl);
      deferred.reject();
    }

    return deferred.promise;
  };

  function isAuthenticatedFacebookPromise() {
    let deferred = $q.defer();
    
    if (isAuthenticatedFacebook()) {
      deferred.resolve();
    } else {
      $location.path(loginFacebookUrl);
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
    isAuthenticatedAdm: isAuthenticatedAdm,
    isAuthenticatedAdmPromise: isAuthenticatedAdmPromise,
    isAuthenticatedFacebook: isAuthenticatedFacebook,
    isAuthenticatedFacebookPromise: isAuthenticatedFacebookPromise,
    hasNotPermission: hasNotPermission,
    isNotAuthenticated: isNotAuthenticated,
    hasPermissionPromise: hasPermissionPromise,
    facebookLogged: facebookLogged
  };
});