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
   putTodo: (req, res) => {
      try {
         const id = parseInt(req.params.id, 10)
         const title = req.body.title;
         const body = req.body.body;

         const todo = Todo.updatedTodo(id, title, body);
         res.status(200).json(todo)
      } catch (e) {
         res.status(400).json({ message: e.message })
      }
   },
   deleteTodo: (req, res) => {
      const id = parseInt(req.params.id, 10);

      try {
         const todo = Todo.removeTodo(id);
         res.status(200).json(todo)
      } catch (e) {
         res.status(400).json({ message: e.message })
      }
   }
}