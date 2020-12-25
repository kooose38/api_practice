const todos = []

let num = 1;

class Todo {
   constructor(title, body) {
      this.id = num++;
      this.title = title;
      this.body = body;
      this.createdAt = new Date();
      this.updatedAt = new Date();
   }
};

for (let i = 0; i < 5; i++) {
   const index = i + 1;
   const title = "本文" + index;
   const body = "内容" + index;
   const todo = new Todo(title, body);
   todos.push(todo)
}


module.exports = {
   findAll: () => {
      return [...todos]
   },
   createTodo: (title, body) => {
      if (!title) {
         throw new Error("title?")
      }
      if (!body) {
         throw new Error("body?")
      }
      const todo = new Todo(title, body);
      todos.push(todo);

      return todo;
   },
   updatedTodo: (id, title, body) => {
      if (typeof id !== "number" || id < 1) {
         throw new Error("id?")
      }
      if (!title) {
         throw new Error("title?")
      }
      if (!body) {
         throw new Error("body?")
      }

      const index = todos.findIndex(todo => todo.id === id)
      if (index === -1) {
         throw new Error("idが不正です")
      }

      const updateTodo = todos[index];
      updateTodo.title = title;
      updateTodo.body = body;
      updateTodo.updatedAt = new Date();

      return updateTodo;
   }
}