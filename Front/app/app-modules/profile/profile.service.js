angular
    .module('app.core')
    .factory('ProfileService', function($rootScope,$http, $q, $localStorage, AppConstants) {
        const url = `${AppConstants.url}/user`;

        return {
            getUserProfile: _getUserProfile
        }

        
    });