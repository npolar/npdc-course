'use strict';
var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');

var npdcCourseApp = angular.module('npdcCourseApp', ['npdcCommon']);

npdcCourseApp.controller('CourseShowController', require('./show/CourseShowController'));
npdcCourseApp.controller('CourseSearchController', require('./search/CourseSearchController'));
npdcCourseApp.controller('CourseEditController', require('./edit/CourseEditController'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
  {'path': '/coursetype', 'resource': 'Coursetype' },
  {'path': '/course', 'resource': 'Course' }
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcCourseApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
  return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcCourseApp.config(require('./router'));

npdcCourseApp.config(($httpProvider, npolarApiConfig) => {
  var autoconfig = new AutoConfig("production");
  angular.extend(npolarApiConfig, autoconfig, { resources });
  console.debug("npolarApiConfig", npolarApiConfig);

  $httpProvider.interceptors.push('npolarApiInterceptor');
});

npdcCourseApp.run(($http, npdcAppConfig, NpolarTranslate, NpolarLang) => {
  NpolarTranslate.loadBundles('npdc-course');
  npdcAppConfig.toolbarTitle = 'NPI courses';
});
