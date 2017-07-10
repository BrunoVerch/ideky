angular
    .module('app.core')
    .factory('LoginService', function($http, AppConstants) {
        const url = `${AppConstants.url}/api/auth`;

        return {
            login: login
        }

        function login() {
            return $http.get(`${url}/ExternalLogin?provider=Facebook`);
        }
    });