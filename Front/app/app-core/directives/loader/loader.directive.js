angular
    .module('app.core')
    .directive('loader', function($rootScope){
        return {
            templateUrl: '/app/app-core/directives/loader/loader.directive.html',
            restrict: "E",
            replace: true, 
            link: (scope, element, attrs, controllers) => {
                $rootScope.$on("loader_show", function() {
                    element.removeClass('hide');
                });

                $rootScope.$on("loader_hide", function() {
                    element.addClass('hide');
                });
            }
        }
    });