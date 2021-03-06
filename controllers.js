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
      var events;
      if (data.events.event.length>=8) {
        events = data.events.event.slice(0,8);
      }
      $scope.eventsList.push({
        "category": "Music & Concerts",
        "events": events
      });
    });
    eventsService.exhibitions($scope.formattedAddress).$promise.then(function(data) {
      var events;
      if (data.events.event.length>=8) {
        events = data.events.event.slice(0,8);
      }
      $scope.eventsList.push({
        "category": "Art & Exhibitions",
        "events": events
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
  $scope.destination = destinationService.formattedAddress;
  $scope.eventsList = [];
  var destination = destinationService.formattedAddress;

  $scope.eventsList.length = 0;
  eventsService.concerts(destination).$promise.then(function(data){;
    var events;
    if (data.events.event.length>=8) {
      events = data.events.event.slice(0,8);
    }
    $scope.eventsList.push({
      "category": "Music & Concerts",
      "events": events
    });
  });
  eventsService.exhibitions(destination).$promise.then(function(data) {
    var events;
    if (data.events.event.length>=8) {
      events = data.events.event.slice(0,8);
    }
    $scope.eventsList.push({
      "category": "Art & Exhibitions",
      "events": events
    });
  });
  eventsService.sports(destination).$promise.then(function(data) {
    var events;
    if (data.events.event.length>=4) {
      events = data.events.event.slice(0,4);
    }
    $scope.eventsList.push({
      "category": "Sports",
      "events": events
    });
  });
  eventsService.nightlife(destination).$promise.then(function(data) {
    var events;
    if (data.events.event.length>=8) {
      events = data.events.event.slice(0,8);
    }
    $scope.eventsList.push({
      "category": "Nighlife & Social",
      "events": events
    });
  });

}]);
