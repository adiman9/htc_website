import angular from 'angular';
import firebase from 'firebase';
import myCourses from './my-courses.component';

import uiRouter from 'angular-ui-router';

const myCoursesComponent = angular
  .module('myCourses', [
    uiRouter
  ])
  .component('myCourses', myCourses)
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('myCourses', {
        url: '/',
        template: '<my-courses courses="$resolve.signin"></my-courses>',
        // TODO add a resolve to check wait for log in Sun 29 Jan 2017 02:24:09 UTC
        resolve: {
          signin: ['userData', (userData) => {
            return new Promise(resolve => {
              firebase.auth().onAuthStateChanged((user) => {
                if(user && !user.isAnonymous){
                  // TODO get courses user is enrolled in Thu 16 Feb 2017 17:09:56 GMT
                  userData.getUserMeta(user.uid)
                    .then(user => {
                      resolve(user);
                    });
                }else{
                  resolve(false);
                }
              });
            });
          }]
        }
      });
      $urlRouterProvider.otherwise('/');
  }])
  .name;

export default myCoursesComponent;
