angular
	.module('app.core')
	.controller('LevelsadmController', function ($scope, AdministrativeService, GameService, toastr) {
		$scope.loadLevel = level => $scope.level = $scope.levels[level-1];

		(getLevels = () => {
			GameService.getLevels()
				.then(response => { 
					$scope.levels = response.data.data; 
					console.log(response.data);
				})
				.catch(error => console.log(error))
		})()		
		
		$scope.editLevel = level => {
			AdministrativeService.editLevel(level)
				.then(response => {
					$scope.level = null;
					$scope.levelSelect = null;
					toastr.success('Nível alterado com sucesso!');
					console.log(response);
				})
				.catch(error => {
					toastr.error('Shhhh, algo errado não deu certo!');
					console.log(error);
				});
		}
});