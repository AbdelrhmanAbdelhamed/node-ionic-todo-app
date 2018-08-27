var connection = require('../../config/connection');

function User() {

	this.get = function(res, Id) {
		connection.query('select * from users where Id = ?', [Id], function(error, results, fields) {

			if (error) {
				res.json({
					status: false,
					message: 'User gathering failed'
				});

			} else {
				res.json({
					status: true,
					message: results
				});
			}
		});
	};

	this.create = function(res, user) {

		connection.query('insert into users set ?', user, function(error, results, fields) {

			if (error) {
				res.json({
					status: false,
					message: 'User creation failed'
				});

			} else {
				res.json({
					status: true,
					message: results.insertId
				});
			}
		});
	};

	this.signIn = function(res, data) {
		connection.query('select * from users where Email = ? and password = ?', [data['Email'], data['password']], function(error, results, fields) {

			if (error) {
				res.json({
					status: false,
					message: 'User gathering failed'
				});

			} else {
				res.json({
					status: true,
					message: results
				});
			}
		});
	}

}
module.exports = new User();