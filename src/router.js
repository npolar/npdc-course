'use strict';

var router = function($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show-course.html',
    controller: 'CourseShowController'
  }).when('/:id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'CourseEditController'
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'CourseSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
