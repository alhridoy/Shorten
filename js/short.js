var SERVER_URI = 'url-shortener-freecodecamp.herokuapp.com';
var app = angular.module('srApp', []);

app.factory('factoryURI', function($http) {

  return {
    fetch : $http.get('//'+ SERVER_URI +'/latest'),
    create : function(uri) {
      return $http({
        method: 'POST',
        data : {url : uri},
        url : '//' + SERVER_URI
      });
    }
  }
});

app.controller('srCtrl', function($scope, factoryURI) {
  $scope.isLoading = true;
  $scope.resultingURI = null;
  $scope.isError = false;
  $scope.latest = [];
  
  function updateURIS() {
    factoryURI.fetch.success(function(data) {
       $scope.latest = data.map(function(d) {
           d.url = 'https://'+ SERVER_URI +'/' + d.uid;
           return d;
       });
      
      $scope.isLoading = false;
    });
  }

 $scope.resetResult = function() {
   $scope.resultingURI = null;
   $scope.shortifierURI = null;
 }
 
 $scope.submit = function(shortifierURI) {
   $scope.isLoading = true;
   factoryURI.create(shortifierURI).then(
     function(data) {
       $scope.latest = [
         {url : data.data.url}, 
         $scope.latest.shift(),
         $scope.latest.shift() ];
       $scope.resultingURI = data.data.url;
       $scope.isError = false;
       $scope.isLoading = false;
     }, function(err) {
       $scope.isLoading = false;
       $scope.resultingURI = null;
       $scope.isError = true;
       $scope.shortifierURI = shortifierURI;
   });
 }
  
 updateURIS();
});