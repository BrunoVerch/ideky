angular
    .module('app.core')
    .factory('HomeService', function($http) {
        const url = 'http://localhost:60550/api/user';

        return {
            getByFacebookId: getByFacebookId,
            register: register,
            setNewRecord: setNewRecord
        }

        function getByFacebookId(id) {
            return $http.get(`${url}/${id}`);
        }

        function register(user) {
            return $http({
                url: url,
                method: 'POST',
                data: user
            });
        }

        function setNewRecord(record) {
            return $http({
                url: url,
                method: 'POST',
                data: record
            });
        }
    });