angular
    .module('app.core', [
        'ngRoute',
        'ui.bootstrap',
        'ngAnimate',
        'toastr',
        'ngStorage',
        'luegg.directives',
        'auth',
    ]);

angular
    .module('app', [        
        'app.core'
    ]);