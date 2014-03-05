'use strict';

/* App Module */

var eventApp = angular.module('eventApp', [
  'ngRoute',
  'eventControllers',
  'eventFilters',
  'ngCookies',
  'eventAnimations'
]);

eventApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/events', {
        templateUrl: 'partials/event-list.html',
        controller: 'EventListCtrl'
      }).
      when('/events/:eventId', {
        templateUrl: 'partials/event-detail.html',
        controller: 'EventDetailCtrl'
      }).
      when('/favourites', {
        templateUrl: 'partials/favourites.html',
        controller: 'FavouritesCtrl'
      }).
      otherwise({
        redirectTo: '/events'
      });
  }]);
