const assert = require("power-assert")
const Helper = require("../requestHelper")

const getTodos = async () => {
   const res = await Helper.request({
      method: "get",
      endPoint: "/api/todo",
      statusCode: 200
   })
   return res.body;
}

describe("delete API test ", () => {
   it("id?", () => {
      const invaildId = [
         {},
         { id: 0 },
         { id: -1 },
         { id: null },
         { id: [] },
         { id: {} }
      ];

      invaildId.forEach(async (id) => {
         const res = await Helper.request({
            method: "delete",
            endPoint: `/api/todo/${id}`,
            statusCode: 400
         })
         assert.deepEqual(res.body, {
            message: "id?"
         })
      })
   });

   it("idが不正", async () => {
      const INVARID_ID = 999999;

      const res = await Helper.request({
         method: "delete",
         endPoint: `/api/todo/${INVARID_ID}`,
         statusCode: 400
      })

      assert.deepEqual(res.body, {
         message: "idは不正です"
      });
   });

   it("正常テスト", async () => {
      const oldTodos = await getTodos();

      const currentId = 1;

      const res = await Helper.request({
         method: "delete",
         endPoint: `/api/todo/${currentId}`,
         statusCode: 200,
      })
      const removedTodo = res.body;

      assert.deepEqual(removedTodo, {
         id: currentId,
         title: removedTodo.title,
         body: removedTodo.body,
         createdAt: removedTodo.createdAt,
         updatedAt: removedTodo.updatedAt,
      });

      const newTodos = await getTodos();

      assert.equal(oldTodos.length - 1, newTodos.length);
      assert.equal(oldTodos[currentId - 1] !== newTodos[currentId - 1], true)
   });
})