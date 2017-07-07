angular
    .module('app.core')
    .factory('GameService', function ($http) {

        return {
            getFriends: getFriends
        }

        function getFriends(type, callback) {
            return FB.api(`/me/${type}?limit=99999`, callback);
        }
    });