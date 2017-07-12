angular.module('app')
		.constant('AppConstants', {
            //url: 'http://ideky.azurewebsites.net'
            url: 'http://localhost:60550'
		});

angular.module("app")
		.constant('authConfig', {

        userUrl: 'http://localhost:60550/administrative/get',

        loginUrl: '/loginadm',

        privateUrl: '/menuadm',

        logoutUrl: '/loginadm'
    	});