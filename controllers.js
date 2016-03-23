// Controllers
ifIGoToApp.controller('homeController', ["$scope", "destinationService", "weatherService", "eventsService",
function($scope, destinationService, weatherService, eventsService){
  $scope.destination = destinationService.destination;
  $scope.inputHtmlElement = $("#destination_search")[0];
  $scope.country = destinationService.country;
  $scope.formattedAddress = destinationService.formattedAddress;
  $scope.eventsList = [];
  $scope.handleGoClick = function() {
    console.log("handling Go click!");
    console.log($scope.destination);
    // update the GUIDE CONTENT
    // WEATHER CURRENT Condition
    weatherService.getCurrentWeather($scope.destination).$promise.then(function(data){
      $scope.currentWeather = data;
    });
    // EVENTS
    $scope.eventsList.length = 0;
    eventsService.concerts($scope.formattedAddress).$promise.then(function(data){
      console.log("concerts data: ");
      console.log(data);
      $scope.eventsList.push({
        "category": "Music & Concerts",
        "events": data.events.event.slice(0,8)
      });
    });
    eventsService.exhibitions($scope.formattedAddress).$promise.then(function(data) {
      $scope.eventsList.push({
        "category": "Art & Exhibitions",
        "events": data.events.event.slice(0,8)
      });
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
  $scope.eventsList = [];
  var city = destinationService.destination;

  eventsService.concerts(city).$promise.then(function(data){
    console.log("concerts data: ");
    console.log(data);
    // $scope.eventsList.concerts = data.events.event;
  });

  eventsService.performingArts(city).$promise.then(function(data) {
    // $scope.eventsList.exhibitions = data.events.event;
  });

}]);
