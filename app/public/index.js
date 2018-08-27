"use strict";

var deviceReady;

(function() {
    var onDeviceReady = function() {
        deviceReady = true;
    };
    document.addEventListener('deviceready', onDeviceReady, false);
}());

var app = angular.module('TODOApp', ['ionic', 'ngCordova']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Signin');

    $stateProvider

        .state('GlobalRoom', {
        url: '/GlobalRoom',
        templateUrl: 'templates/global-room.html',
        controller: 'GlobalController',
    })

    .state('Signin', {
        url: '/Signin',
        templateUrl: 'templates/sign-in.html',
        controller: 'UserController@signin'
    })

    .state('Signup', {
        url: '/Signup',
        templateUrl: 'templates/sign-up.html',
        controller: 'UserController@signup'
    })

    .state('TODOApp', {
        url: '/TODOApp',
        templateUrl: 'templates/todo-app.html',
        controller: 'ToDoController',
        cache: false
    });
});