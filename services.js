// SERVICES
// destinationService
ifIGoToApp.service('destinationService', function(){
  this.destination = "San Francisco";
  this.formattedAddress = "San Francisco, CA, USA";
  this.country = "";
});

ifIGoToApp.service('weatherService', ["$resource", function($resource) {

  var openWeatherAPI = "http://api.openweathermap.org/data/2.5/";
  var currentWeatherAPI = $resource(openWeatherAPI + "weather", {callback: "JSON_CALLBACK"}, { get: {method: "JSONP"}});
  var weatherForecastAPI = $resource(openWeatherAPI + "forecast/daily", {callback: "JSON_CALLBACK"}, { get: {method: "JSONP"}});

  // Current Condition results
  this.getCurrentWeather = function(city) {
    console.log("Weather Service: get current weather for: " + city);
    return currentWeatherAPI.get({q: city, APPID: openWeatherMap_api_key});
  }

  // Forecast results
  this.getForecastResult = function(city) {
    console.log("Weather service: get forecast result for: " + city);
    return weatherForecastAPI.get({q: city, cnt: 6, APPID: openWeatherMap_api_key});
  }

  // Weather Data Conversion
  this.convertToFahrenheit = function(degK) {
    return (1.8*(degK - 273) + 32).toFixed(1);
  }

  this.convertToCelcius = function(degK) {
    return (degK - 273.15).toFixed(1);
  }

  this.correctDate = function(dt) {
    return dt*1000;
  }

  this.getDay = function(dt) {
    var date = new Date(dt*1000);
    var day = date.getDay();
    switch(day) {
      case 0:
      return "Sunday";
      case 1:
      return "Monday";
      case 2:
      return "Tuesday";
      case 3:
      return "Wednesday";
      case 4:
      return "Thursday";
      case 5:
      return "Friday";
      case 6:
      return "Saturday";
    }
  }

  this.getIconSrc = function(weather) {
    if (!weather) return "";
    return "http://openweathermap.org/img/w/" + weather["icon"] + ".png";
  }

}]);

ifIGoToApp.service("eventsService", ["$resource", function($resource) {

  var eventfulUrl = "http://api.eventful.com/json/events/search";
  var eventfulAPI = $resource(eventfulUrl, {callback: "JSON_CALLBACK"}, { get: {method: "JSONP"}});

  function getEvents(category, city) {
    return eventfulAPI.get({
      app_key: eventful_api_key,
      location: city,
      date: "Future",
      category: category,
      image_sizes: "perspectivecrop290by250",
      sort_order: "popularity"
    });
  }

  this.concerts = function(city) {
      var category = "music";
      return getEvents(category, city);
  }

  this.performingArts = function(city) {
    var category = "performing_arts";
    return getEvents(category, city);
  }

  this.exhibitions = function(city) {
    var category = "art";
    return getEvents(category, city);
  }

  this.nightlife = function(city) {
    var category = "singles_social";
    return getEvents(category, city);
  }

  this.sports = function(city) {
    var category = "sports";
    return getEvents(category, city);
  }

}]);
