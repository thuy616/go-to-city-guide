// DIRECTIVES
// google place autocomplete
ifIGoToApp.directive('placeAutocomplete', function(){
  return {
    scope: {
      inputHtml: '=',
      destinationName: '=',
      formattedAddress: '=',
      country: '='
    },
    link: function(scope, element, attrs, model) {
      console.log("pre destinationName: " + scope.destinationName);
      var autocomplete = new google.maps.places.Autocomplete(scope.inputHtml, { types: ['(cities)'] });

      autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        scope.$apply(function() {
            scope.destinationName = place.name;
            scope.formattedAddress = place.formatted_address;
            var addressComponents = place.address_components;
            scope.country = addressComponents[addressComponents.length-1].long_name;
        });
        console.log("post destinationName: " + scope.destinationName);
      });
    }
  }
});

ifIGoToApp.directive("weatherReport", function() {
  return {
    templateUrl: 'directives/currentWeather.html',
    replace: true,
    scope: {
      condition: '=',
      convertToCelcius: '&',
      convertToFahrenheit: '&',
      correctDate: '&',
      getDay: '&',
      getIconSrc: '&'
    }
  }
});
