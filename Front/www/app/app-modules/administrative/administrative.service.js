angular
    .module('app.core')
    .factory('AdministrativeService', function ($http) {
        const urlUser = 'http://localhost:60550/api/user';
        const urlGame = 'http://localhost:60550/api/game';
        const urlLevel = 'http://localhost:60550/api/level';

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