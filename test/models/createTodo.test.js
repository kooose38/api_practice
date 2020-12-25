const assert = require("power-assert");
const Todo = require("../../models/Todo");

describe("createTodo メソッドへのテスト", () => {
   it("functions?", () => {
      assert.equal(typeof Todo.createTodo === "function", true);
   });

   it("titleがない", () => {
      const title = undefined || null;
      const body = "dammy";
      try {
         Todo.createTodo(title, body);
         assert.fail();
      } catch (e) {
         assert.equal(e.message, "title?");
      }
   });

   it("bodyがない", () => {
      const title = "dammy";
      const body = undefined || null;
      try {
         Todo.createTodo(title, body)
         assert.fail();
      } catch (e) {
         assert.equal(e.message, "body?");
      }
   });

   it("正常なテスト", () => {
      const oldTodos = Todo.findAll();
      const newData = {
         title: "dammy",
         body: "dammy",
      }
      const todo = Todo.createTodo(newData.title, newData.body)
      assert.deepEqual(todo, {
         id: todo.id,
         title: newData.title,
         body: newData.body,
         createdAt: todo.createdAt,
         updatedAt: todo.updatedAt,
      });
      const newTodos = Todo.findAll()

      assert.equal(oldTodos.length + 1, newTodos.length);

   })
})