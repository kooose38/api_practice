const Todo = require("../../models/Todo");
const assert = require("power-assert");

describe("removeTodo メソッドへのテスト", () => {
   it("functions?", () => {
      assert(typeof Todo.removeTodo === "function", true)
   });

   it("id?", () => {
      const invalidId = [
         {},
         { id: 0 },
         { id: -1 },
         { id: null },
         { id: "1" },
         { id: [] },
         { id: {} }
      ];

      invalidId.forEach(id => {
         try {
            Todo.removeTodo(id)
            assert.fail();
         } catch (e) {
            assert.equal(e.message, "id?")
         }
      })
   });

   it("idが不正", () => {
      const INVARID_ID = 999999;
      try {
         Todo.removeTodo(INVARID_ID);
         assert.fail()
      } catch (e) {
         assert.equal(e.message, "idは不正です")
      }
   });

   it("正常テスト", () => {
      const currentId = 1;
      const oldTodos = Todo.findAll();

      const removedTodo = Todo.removeTodo(currentId);
      assert.deepEqual(removedTodo, {
         id: currentId,
         title: removedTodo.title,
         body: removedTodo.body,
         updatedAt: removedTodo.updatedAt,
         createdAt: removedTodo.createdAt,
      });

      const newTodos = Todo.findAll()

      assert.equal(oldTodos.length, newTodos.length + 1);
      assert.equal(removedTodo !== newTodos[currentId - 1], true)

   });
});