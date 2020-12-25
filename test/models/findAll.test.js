const assert = require("power-assert");
const Todo = require("../../models/Todo");


describe("findAll methods", () => {
   it("メソッドであるか？", () => {
      assert.equal(typeof Todo.findAll === "function", true)
   });
   it("データは正常化？", () => {
      const todos = Todo.findAll();
      assert.equal(Array.isArray(todos), true);
      assert.equal(todos.length > 0, true);

      todos.forEach(todo => {
         assert.deepEqual({ ...todo }, {
            id: todo.id,
            title: todo.title,
            body: todo.body,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
         })
      })
   });
});