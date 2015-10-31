angular.module('homePage', [
  'ui.router'
])
.config(function ($stateProvider) {
    $stateProvider
    .state('auth.homePage', {
        url: '/HomePage',
        controller: 'mainController',
        templateUrl: 'homePage/HomePage.htm'
    });
})
.controller('mainController', function mainController($scope, PostFeedService) {
	$scope.IsErrorInProceesing = false;
	$scope.IsStatusSubmitted = false;
	$scope.StatusData={};
	$scope.StatusDataSubmitted={};
    $scope.submitStatus = function(StatusData){
	if(StatusData.comments){
		// StatusData.timestamp = new Date().getTime()
		PostFeedService.saveStatus($scope.StatusData).then(function(respone){
		if(respone.data.errors){
			$scope.IsErrorInProceesing=true;
		}else{
			$scope.StatusDataSubmitted=$scope.StatusData;
			$scope.StatusData={};
			$scope.IsErrorInProceesing=false;
			$scope.IsStatusSubmitted = true;
		} }, function(error){
		$scope.IsErrorInProceesing=true;
		});
	}else{
	alert("Invalid StatusData");
	}
	};
   

});