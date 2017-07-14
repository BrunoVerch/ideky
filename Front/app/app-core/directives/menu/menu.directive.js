angular
    .module('app.core')
    .directive('menu', function(authService, toastr, $location){
        return {
            templateUrl: '/app/app-core/directives/menu/menu.directive.html',
            restrict: "E",
            replace: true,
            link: function(scope, element, attrs, controllers) {
                scope.isAdmMenu = attrs.menuType === 'adm';

                scope.redirectProfile = () => {
                    $location.path('/profile');		
                }
                scope.redirectRanking = () => {
                    $location.path('/ranking');		
                }
                scope.redirectMenu = () => {
                    $location.path('/menuadm');		
                }
                scope.logout = () => {
                    authService.logout();
                    toastr.success('Deslogado com sucesso!');		
                }
            }   
        }     
    });