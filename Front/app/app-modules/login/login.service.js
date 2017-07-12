angular
    .module('app.core')
    .factory('LoginService', function ($http, $q, AppConstants, $localStorage) {
        const url = `${AppConstants.url}/auth`;

        return {
            obtainAccessToken: _obtainAccessToken
        }

        function _obtainAccessToken(externalData) {
            const { externalAccessToken, provider } = externalData
            const path = `${url}/ObtainLocalAccessToken?externalAccessToken=${externalAccessToken}&provider=${provider}`;
            return $http.get(path, { async: false })
        }
    });