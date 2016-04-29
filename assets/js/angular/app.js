'use strict';

var app_module = angular.module('todo', ['ngRoute', 'todo.task']);

app_module.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/index.html',
            controller: 'CreateTaskController'
        }).when('/read', {
            templateUrl: '/templates/read.html',
            controller: 'ReadTaskController'
        }).otherwise({
            redirectTo: '/'
        })
    }
]);
