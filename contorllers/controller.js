const Todo = require("../models/Todo");

module.exports = {
   getTodo: (req, res) => {
      const todos = Todo.findAll();
      res.status(200).json(todos)
   },
}