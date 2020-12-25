const assert = require("power-assert");
const Todo = require("../../models/Todo")

const currentId = 1;
const INVARID_ID = 999999;

describe("updatedTodo method ?", () => {
   it("functions?", () => {
      assert.equal(typeof Todo.updatedTodo === "function", true)
   });

   it("id?", () => {
      const data = {
         title: "dammy",
         body: "dammy"
      };
      const invalidId = [
         {},
         { id: 0 },
         { id: -1 },
         { id: "1" },
         { id: {} },
         { id: [] },
         { id: null }
      ];

      invalidId.forEach(id => {
         try {
            Todo.updatedTodo(id.id, data.title, data.body);
            assert.fail();
         } catch (e) {
            assert.equal(e.message, "id?")
         }
      })
   });

   it("title?", () => {
      const data = {
         title: null || undefined,
         body: "dammy,"
      }
      try {
         Todo.updatedTodo(currentId, data.title, data.body);
         assert.fail()
      } catch (e) {
         assert.equal(e.message, "title?")
      }
   });

   it("body?", () => {
      const data = {
         title: "dammy",
         body: null || undefined,
      }
      try {
         Todo.updatedTodo(currentId, data.title, data.body);
         assert.fail()
      } catch (e) {
         assert.equal(e.message, "body?")
      }
   });

   it("idが不正", () => {
      const data = {
         title: "dammy",
         body: "dammy"
      }
      try {
         Todo.updatedTodo(INVARID_ID, data.title, data.body);
         assert.fail()
      } catch (e) {
         assert.equal(e.message, "idが不正です")
      }
   });
   it("正常テスト", () => {
      const oldTodos = Todo.findAll();

      const data = {
         title: "dammy",
         body: "dammy"
      };

      const updatedTodo = Todo.updatedTodo(currentId, data.title, data.body);
      assert.deepEqual(updatedTodo, {
         id: currentId,
         title: data.title,
         body: data.body,
         createdAt: updatedTodo.createdAt,
         updatedAt: updatedTodo.updatedAt
      })
      const newTodos = Todo.findAll()

      assert.equal(updatedTodo.createdAt < updatedTodo.updatedAt, true)
      assert.equal(oldTodos.length, newTodos.length)
      assert.deepEqual(newTodos[currentId - 1], updatedTodo)
   })
})