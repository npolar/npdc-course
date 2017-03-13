'use strict';


var CourseSearchController = function ($scope, $location, $controller, $filter, Course, npdcAppConfig, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Course;

 //var path = window.location.host;
 var href = window.location.href;
 var href2 = href.split("course/");
 $scope.path = href2[0] + 'coursetype';


 npdcAppConfig.search.local.results.detail = (entry) => {
     let updatedText = NpolarTranslate.translate('updated');
     let comment = (entry.comment) == (null || undefined)? "" : (entry.comment) + ", ";
     let r =   comment + updatedText +":";
     return r+` ${(entry.updated.split('T')[0])}`;
 };


  npdcAppConfig.cardTitle = "NPI Course";
  npdcAppConfig.search.local.results.subtitle = "type";


  let query = function() {
    let defaults = {
      limit: "50",
      sort: "-updated",
      fields: 'title,id,collection,updated,comment',
      facets: 'comment'};

    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = CourseSearchController;

