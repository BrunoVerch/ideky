angular
    .module('app.core')
    .factory('LoginService', function($http, AppConstants) {
        const url = `${AppConstants.url}/api/auth`;

        return {
            login: login
        }

        function login() {
            return $http({
                method: 'GET',
                url: `${url}/ExternalLogin?provider=Facebook`,
                headers: {
                    'Access-Control-Allow-Origin': true,
                    'X-Requested-With': 'XMLHttpRequest'
                }        
            });
        }
    });