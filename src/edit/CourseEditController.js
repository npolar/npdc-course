'use strict';

var CourseEditController = function($scope, $controller, $routeParams, Course, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService, fileFunnelService, NpolarLang, npolarApiConfig,
  NpolarApiSecurity, npolarCountryService, NpolarMessage) {
  'ngInject';


  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // Course -> npolarApiResource -> ngResource
  $scope.resource = Course;


  let templates = [{
        match: "people_item",
        template: '<npdc:formula-person></npdc:formula-person>'
  }];

  let i18n = [{
      map: require('./en.json'),
      code: 'en'
    },
    {
      map: require('./no.json'),
      code: 'nb_NO',
    }];

  $scope.formula = formula.getInstance({
    schema: '//api.npolar.no/schema/course',
    form: 'edit/formula.json',
    language: NpolarLang.getLang(),
    templates: npdcAppConfig.formula.templates.concat(templates),
    languages: npdcAppConfig.formula.languages.concat(i18n)
   });


  formulaAutoCompleteService.autocomplete({
    match: "coursetype_id",
    querySource: npolarApiConfig.base + '/coursetype',
    label: 'title',
    value: 'id'
}, $scope.formula);

let autocompleteFacets = ['title'];
  formulaAutoCompleteService.autocompleteFacets(autocompleteFacets, Course, $scope.formula);



//Set chronopic view format (this does not change the internal value, i.e. ISO string date)
 chronopicService.defineOptions({ match(field) {
    return field.path.match(/_date$/);
 }, format: '{date}'});

  $scope.edit();

};

module.exports = CourseEditController;