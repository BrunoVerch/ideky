angular
    .module('app.core')
    .factory('ProfileService', function($rootScope,$http, $q, $localStorage, AppConstants) {
        const url = `${AppConstants.url}/game`;

        return {
            getUserProfile: _getUserProfile,
            getFriendsRanking: _getFriendsRanking
        }
    });