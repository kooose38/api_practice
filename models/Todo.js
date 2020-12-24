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
}