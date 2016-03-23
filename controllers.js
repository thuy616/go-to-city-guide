// Controllers
ifIGoToApp.controller('homeController', ["$scope", "destinationService", "weatherService", function($scope, destinationService, weatherService){
  $scope.destination = destinationService.destination;
  $scope.inputHtmlElement = $("#destination_search")[0];
  $scope.country = destinationService.country;
  $scope.formattedAddress = destinationService.formattedAddress;

  $scope.handleGoClick = function() {
    console.log("handling Go click!");
    console.log($scope.destination);
    // update the GUIDE CONTENT
    // WEATHER CURRENT Condition
    weatherService.getCurrentWeather($scope.destination).$promise.then(function(data){
      console.log("data: ");
      console.log(data);

      $scope.currentWeather = data;

    });
  }

  $scope.convertToCelcius = weatherService.convertToCelcius;
  $scope.convertToFahrenheit = weatherService.convertToFahrenheit;
  $scope.getDay = weatherService.getDay;
  $scope.correctDate = weatherService.correctDate;
  $scope.getIconSrc = weatherService.getIconSrc;

  var initialize = function() {
    $scope.handleGoClick();
  }
  initialize();

  $scope.$watch('destination', function(){
    console.log("destination changed");
    destinationService.destination = $scope.destination;
    destinationService.country = $scope.country;
    destinationService.formattedAddress = $scope.formattedAddress;

  });
}]);

ifIGoToApp.controller('forecastController', ["$scope", "destinationService", "weatherService", function($scope, destinationService, weatherService){
  $scope.destination = destinationService.destination;
  $scope.formattedAddress = destinationService.formattedAddress;

  weatherService.getCurrentWeather($scope.destination).$promise.then(function(data){
    $scope.currentWeather = data;
  });
  weatherService.getForecastResult($scope.destination).$promise.then(function(data){
    $scope.forecastResult= data;
  });

  $scope.convertToCelcius = weatherService.convertToCelcius;
  $scope.convertToFahrenheit = weatherService.convertToFahrenheit;
  $scope.getDay = weatherService.getDay;
  $scope.correctDate = weatherService.correctDate;
  $scope.getIconSrc = weatherService.getIconSrc;
}]);

ifIGoToApp.controller('eventsController', ["$scope", "destinationService", "eventsService", function($scope, destinationService, eventsService) {

}]);
