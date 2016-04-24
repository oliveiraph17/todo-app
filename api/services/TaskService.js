module.exports = {
    create: function(task_value, callback) {
        var task = {value: task_value};

        Task.create(task).exec(function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },

    read: function(callback) {
        // It is like a 'select * from tasks' query
        Task.find().exec(function(err, tasks) {
            if (err) {
                throw err;
            }

            callback(tasks);
        });
    },

    delete: function(task_value, callback) {
        var task = {value: task_value};

        Task.destroy(task).exec(function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    }
};
