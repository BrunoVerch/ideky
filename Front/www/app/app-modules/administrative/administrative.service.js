angular
    .module('app.core')
    .factory('AdministrativeService', function ($http, AppConstants) {
        const urlUser = `${AppConstants.url}/api/user`;
        const urlGame = `${AppConstants.url}/api/game`;
        const urlLevel = `${AppConstants.url}/api/level`;

        return {
            addLifes: addLifes,
            resetRanking: resetRanking,
            editLevel: editLevel
        }

        function addLifes(userLife) { 
          return $http({
            url: `${urlUser}/lifes`,
            method: 'PUT',
            data: userLife
          });
        }

        function editLevel(level) {
          return $http({
            url: `${urlLevel}/edit`,
            method: 'PUT',
            data: level
          });
        }

        function resetRanking() {
          return $http({
            url: `${urlGame}/reset`,
            method: 'PUT',
          });
        }
    });