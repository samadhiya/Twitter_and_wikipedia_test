var myApp = angular.module('myApp', []);

myApp.controller('MyController', ['$scope', '$http', function($scope, $http) {
	$scope.loading = true;
	$http.get('/api/twitter').success(function(data) {
		$scope.tweets = data.statuses;
		$scope.loading = false;
	});
}]);