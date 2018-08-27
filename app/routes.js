var todo = require('./models/todo');

var user = require('./models/user');
/****************************************************************/
module.exports = {
  configure: function(app) {

    app.get('/api/todos/:userId', function(req, res) {
      todo.get(res, req.params.userId);
    });

    app.post('/api/todos', function(req, res) {
      todo.create(res, req.body);
    });

    app.put('/api/todos', function(req, res) {
      todo.update(res, req.body);
    });

    app.delete('/api/todos/:Id', function(req, res) {
      todo.delete(res, req.params.Id);
    });

    app.get('/api/users/:Id', function(req, res) {
      user.get(res, req.params.Id);
    });

    app.post('/api/users', function(req, res) {
      user.create(res, req.body);
    });

    app.post('/api/users/signIn', function(req, res) {
      user.signIn(res, req.body);
    });
/****************************************************************/
    app.get('*', function(req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

  }
};