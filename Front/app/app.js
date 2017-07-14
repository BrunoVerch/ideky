angular.module('app')
	.run([
		'$log',
		function($log) {
			$log.debug('App Running')
		}
	])
	.config([
		'$logProvider',
		'$httpProvider',
		function($logProvider, $httpProvider) {
			$logProvider.debugEnabled(true);
      		$httpProvider.interceptors.push('httpInterceptor');
		}		 
	])