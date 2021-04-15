"use strict";

var getTodos = function getTodos(req, res) {
  return regeneratorRuntime.async(function getTodos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.headers.session); // try {
          //   const allTodos = await pool.query('SELECT * FROM todo')
          //   res.json(allTodos.rows)
          // } catch (err) {
          //   console.error(err.message)
          // }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getTodo = function getTodo(req, res) {
  var id, todo;
  return regeneratorRuntime.async(function getTodo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]));

        case 4:
          todo = _context2.sent;
          res.json(todo.rows);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0.message);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var createTodo = function createTodo(req, res) {
  var description, newTodo;
  return regeneratorRuntime.async(function createTodo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          description = req.body.description;
          _context3.next = 4;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]));

        case 4:
          newTodo = _context3.sent;
          res.json(newTodo.rows);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var updateTodo = function updateTodo(req, res) {
  var id, description, _updateTodo;

  return regeneratorRuntime.async(function updateTodo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          description = req.body.description;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]));

        case 5:
          _updateTodo = _context4.sent;
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](2);
          console.error(_context4.t0.message);

        case 11:
          res.json('Todo was updated');

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

var deleteTodo = function deleteTodo(req, res) {
  var id, _deleteTodo;

  return regeneratorRuntime.async(function deleteTodo$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(pool.query('DELETE FROM todo WHERE todo_id = $1', [id]));

        case 4:
          _deleteTodo = _context5.sent;
          res.json('Deleted todo');
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0.message);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports = {
  getTodos: getTodos,
  getTodo: getTodo,
  createTodo: createTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo
};