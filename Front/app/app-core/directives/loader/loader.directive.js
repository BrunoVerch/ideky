angular
    .module('app.core')
    .directive('loader', function(){
        return {
            templateUrl: '/app/app-core/directives/loader/loader.directive.html',
            restrict: "E",
            replace: true
        }
    });