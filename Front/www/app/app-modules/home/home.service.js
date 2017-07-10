angular
    .module('app.core')
    .factory('HomeService', function($http, AppConstants) {
        const url = `${AppConstants.url}/api/user`;

        return {
            getByFacebookId: getByFacebookId,
            register: register,
            setNewRecord: setNewRecord,
            setNewLogin: setNewLogin
        }

    });