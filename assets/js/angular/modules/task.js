var task_module = angular.module('todo.task', []);

task_module.factory('TaskService', function($http) {
    var tasks = [];

    return {
        // Adds the task to the list of tasks in memory
        'set_tasks': function(task) {
            tasks.push(task);
        },

        // Gets the list of tasks in memory
        'get_tasks': function() {
            return tasks;
        },

        'create': function(task) {
            return $http.post('/task/create', task);
        },

        'read': function() {
            return $http.get('/task/read');
        }
    }
});

task_module.controller('CreateTaskController', ['$scope', 'TaskService', function($scope, TaskService) {
    $scope.form_data = {};

    $scope.create = function() {
        TaskService.create($scope.form_data).then(
            // Success
            function(response) {
                TaskService.set_tasks($scope.form_data);
                $scope.form_data = {};
            },
            // Error
            function(response) {
                console.log('Could not add task to the list.');
            }
        );
    }
}]);

task_module.controller('ReadTaskController', ['$scope', 'TaskService', function($scope, TaskService) {
    // Binds the variable in the scope to the variable of the service
    $scope.tasks = TaskService.get_tasks();

    // Tries to read existing tasks from server
    TaskService.read().then(
        // Success
        function(response) {
            // Updates both the variable in the scope and the variable of the service
            $scope.tasks = response.data;
        },
        // Error
        function(response) {
            console.log('Could not fetch existing tasks from server.');
        }
    );
}]);
