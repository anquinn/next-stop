'use strict';

/* Controllers */

var eventControllers = angular.module('eventControllers', []);

eventControllers.controller('EventListCtrl', ['$scope', '$http', '$cookieStore',
  function($scope, $http, $cookieStore) {
    $http.get('events/events.json').success(function(data) {
      $scope.events = data;
    });

    // Favourite List Array
    $scope.favourites = [];
    //console.log($scope.favourites);

    var temp;
    var temp2 = [];

    //check if cookie exists - if not create it and add empty array
    if($scope.favourites == null) {
      //console.log("is null");

      $cookieStore.put(1, temp);
    }
    temp = $cookieStore.get(1);

    if(temp == null) {
      console.log("temp is null");
      $cookieStore.put(1, temp2);
    }

    //set the array to the cookie
    $scope.favourites = $cookieStore.get(1);
    //console.log($scope.favourites);

    // var date = new Date();
    // date.setTime(date.getTime() + (8 * 60 * 60 * 1000));
    // var myCookieValue = $.cookie('1');
    // console.log(myCookieValue);
    // $.cookie('1', null);
    // $.cookie('1', myCookieValue, { expires:365, path:'/' });

    // Add a Item to the list
    $scope.addItem = function (event) {

      if (!$scope.isFavourite(event)) {
        console.log("is true");
        console.log($scope.favourites);
        $scope.favourites.push({
            id: event.id,
            name: event.name,
            start: event.start,
            end: event.end,
            location: event.location,
            category: event.category
        });

        $cookieStore.put(1, $scope.favourites);

        if ($scope.starred == true) {
          $scope.starred = false;
        }

        else {
          $scope.starred = true;
        }
      }

      else {
        $scope.favourites = $cookieStore.get(1);

        for (var i = 0; i < $scope.favourites.length; i++) {
          if ( $scope.favourites[i].id == event.id) {
            $scope.favourites.splice(i,1);
            $cookieStore.put(1, $scope.favourites);
          }
        }
      }
        
    };

    $scope.isFavourite = function (event) {

      $scope.favourites = $cookieStore.get(1);

      for (var i = 0; i < $scope.favourites.length; i++) {
        if ( $scope.favourites[i].id == event.id) {
          return true;
        }
        console.log("here");
      }

        return false;
    };

    $scope.orderProp = 'category';
  }]);

eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('events/' + $routeParams.eventId + '.json').success(function(data) {
      $scope.event = data;
    });
  }]);

eventControllers.controller('FavouritesCtrl', ['$scope', '$cookieStore',
  function($scope, $cookieStore) {
      $scope.favourites = $cookieStore.get(1);
  }]);