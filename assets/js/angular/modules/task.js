var task_module = angular.module('todo.task', []);

task_module.factory('TaskService', function($http) {
    return {
        'create': function(task) {
            return $http.post('/task/create', task);
        },

        'read': function() {
            return $http.get('/task/read');
        },

        'delete': function(task) {
            return $http.post('/task/delete', task);
        }
    }
});

task_module.controller('TaskController', ['$scope', 'TaskService', function($scope, TaskService) {
    $scope.form_data = {};
    $scope.tasks = [];

    // Tries to read existing tasks from server
    TaskService.read().then(
        // Success
        function(response) {
            $scope.tasks = response.data;
        },
        // Error
        function(response) {
            console.log('Could not fetch existing tasks from server.');
        }
    );

    $scope.create = function() {
        TaskService.create($scope.form_data).then(
            // Success
            function(response) {
                $scope.tasks.push($scope.form_data);
                $scope.form_data = {};
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
                $scope.tasks.splice($scope.tasks.indexOf(task), 1);
            },
            // Error
            function(response) {
                console.log('Could not delete task.');
            }
        );
    }
}]);
