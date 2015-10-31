
angular.module('PostFeedServicesModule', ['ngResource'])
    .factory('PostFeedService', function ($http,$location) {
      return {
		saveStatus: function (StatusData) {
          return $http({
            method: 'POST',
            url: 'http://localhost:8085/api/postStatusData',
            data: JSON.stringify(StatusData)
          })},
		getAlluserStatusData: function () {
		return $http({
        method: 'GET',
        url: 'http://localhost:57370/api/getAllUserStatusData'
        })
		}
      }
});
	