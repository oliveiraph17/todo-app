var task_module = angular.module('todo.task', []);

task_module.factory('TaskService', function($http) {
    return {
        'create': function(task) {
            return $http.post('/todo/create', task);
        },
        'read': function() {
            return $http.get('/todo/read');
        },
        'delete': function(task) {
            return $http.post('/todo/delete', task);
        }
    }
});

task_module.controller('TaskController', ['$scope', 'TaskService', function($scope, TaskService) {
    $scope.form_task = {};
    $scope.task_list = [];

    // Tries to read existing tasks from server
    TaskService.read().then(
        // Success
        function(response) {
            $scope.task_list = response;
        },
        // Error
        function(response) {
            console.log('Could not fetch existing tasks from server.');
        }
    );

    $scope.create = function() {
        TaskService.create($scope.form_task).then(
            // Success
            function(response) {
                $scope.task_list.push($scope.form_task);
                $scope.form_task = {};
            },
            // Error
            function(response) {
                console.log('Could not add task to the list.');
            }
        );
    }

    $scope.delete = function(task) {
        TaskService.delete(task).then(
            // Success
            function(response) {
                $scope.task_list.splice($scope.task_list.indexOf(task), 1);
            },
            // Error
            function(response) {
                console.log('Could not delete task.');
            }
        );
    }
}]);
