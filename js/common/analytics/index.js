import angular from 'angular';
import analyticsService from './analytics.service';
import analyticsDir from './analytics.directive';
import trackClickDir from './trackClick.directive';

const analyticsModule = angular
  .module('analytics.module', [])
  .service('analyticsService', analyticsService)
  .directive('analytics', analyticsDir)
  .directive('analyticsClick', trackClickDir)
  .name;

export default analyticsModule;
