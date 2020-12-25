const Todo = require("../models/Todo");

module.exports = {
   getTodo: (req, res) => {
      const todos = Todo.findAll();
      res.status(200).json(todos)
   },
   postTodo: (req, res) => {
      try {
         const title = req.body.title;
         const body = req.body.body;

         const todo = Todo.createTodo(title, body);
         res.status(200).json(todo)
      } catch (e) {
         res.status(400).json({ message: e.message });
      }
   },
}