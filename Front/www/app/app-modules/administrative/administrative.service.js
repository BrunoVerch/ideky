angular
    .module('app.core')
    .factory('AdministrativeService', function ($http) {
        const urlUser = 'http://localhost:60550/api/user';
        const urlGame = 'http://localhost:60550/api/game';
        const urlLevel = 'http://localhost:60550/api/level';

        return {
            giveLifes: giveLifes,
            resetRanking: resetRanking,
            editLevel: editLevel
        }

        function resetRanking() {
          return $http({
            url: urlGame,
            method: 'PUT',
            data: userLife
          });
        }

        function giveLifes(userLife) { 
          return $http({
            url: `${urlUser}/lifes`,
            method: 'PUT',
            data: userLife
          });
        }

        function editLevel(level) {
          return $http({
            url: urlLevel,
            method: 'PUT',
            data: level
          });
        }
    });