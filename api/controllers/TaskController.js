/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // The actions are named according to the routing patterns used

    // /task/create
    create: function(req, res) {
        var task_value = (req.body.value) ? req.body.value : undefined;

        TaskService.create(task_value, function(result) {
            return res.json(result);
        });
    },

    // /task/read
    read: function(req, res) {
        TaskService.read(function(tasks) {
            return res.json(tasks);
        });
    }
};
