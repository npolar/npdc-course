'use strict';

var CourseShowController = function($controller, $routeParams,
  $scope, $q, Course, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = Course;


  let show = function() {

    $scope.show().$promise.then((Course) => {

    });

  };


  show();

};


module.exports = CourseShowController;
