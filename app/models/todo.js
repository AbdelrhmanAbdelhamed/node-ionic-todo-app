var connection = require('../../config/connection');

function Todo() {

	this.get = function(res, userId) {

		connection.query('select * from todos where userId = ?', [userId], function(error, results, fields) {
			if (error) {
				res.json({
					status: false,
					message: 'Todos gathering failed: ' + error
				});

			} else {
				res.json({
					status: true,
					message: results
				});
			}
		});
	};

	this.create = function(res, todo) {
		connection.query('insert into todos set ?', todo, function(error, results, fields) {

			if (error) {
				res.json({
					status: false,
					message: 'Todo creation: ' + error
				});

			} else {
				res.json({
					status: true,
					message: results.insertId
				});
			}
		});
	};

	this.update = function(res, todo) {
		connection.query('update todos set ? where Id = ?', [todo, todo.Id], function(error, results, fields) {

			if (error) {
				res.json({
					status: false,
					message: 'Todo update: ' + error
				});

			} else {
				res.json({
					status: true,
					message: 'Todo updated successfully'
				});
			}
		});
	};

	this.delete = function(res, Id) {
		connection.query('delete from todos where Id = ?', [Id], function(error, results, fields) {

			if (error) {
				res.json({
					status: false,
					message: 'Failed to delete Todo: ' + error
				});

			} else {
				res.json({
					status: true,
					message: 'Todo Deleted successfully'
				});
			}
		});
	};
}

module.exports = new Todo();