angular
    .module('app.core')
    .factory('HomeService', function($http) {
        const url = 'http://localhost:60550/api/user';

        return {
            getByFacebookId: getByFacebookId,
            register: register,
            setNewRecord: setNewRecord,
            setNewLogin: setNewLogin
        }

    });