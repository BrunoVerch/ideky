angular
    .module('app.core', [
        
    ]);

angular
    .module('app', [
        'ngRoute',
        'ui.bootstrap',
        'ngAnimate',
        'toastr',
        'ngStorage',
        'luegg.directives',
        'app.core'
    ]);