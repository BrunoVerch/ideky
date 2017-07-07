angular.module('app').controller('UserController', function ($scope, userService) { 

  // userService.login()
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));
  
  function init() {
    //Busca todos os amigos 
    userService.getFriends('friends', response => {
      $scope.friends = response.data;
      userService.getFriends('invitable_friends', 
        res => $scope.friends = $scope.friends.concat(res.data));
    });
  }
});