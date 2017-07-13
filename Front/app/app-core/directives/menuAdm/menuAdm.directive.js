angular
    .module('app.core')
    .directive('menuAdm', function(){
        return {
            templateUrl: '/app/app-core/directives/menuAdm/menuAdm.directive.html',
            restrict: "E",
            replace: true, 
            link: (scope, element, attrs, controllers) => {
            }
        }
    });