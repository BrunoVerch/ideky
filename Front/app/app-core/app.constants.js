angular
      .module('app')
      .constant('AppConstants', {
            // url: 'http://ideky.azurewebsites.net/api'
            url: 'http://localhost:60550'
      })
      .constant('authConfig', {

            userUrl: 'http://localhost:60550/administrative/get',

            loginUrl: '/loginadm',

            privateUrl: '/menuadm',

            logoutUrl: '/loginadm'
    	});