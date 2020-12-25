const assert = require("power-assert")
const Helper = require("../requestHelper")

const getTodos = async () => {
   const res = await Helper.request({
      method: "get",
      endPoint: "/api/todo",
      statusCode: 200
   })
   return res.body;
};

const INVARID_ID = 999999;
const currentId = 1;

describe("API putTodo", () => {
   it("id?", () => {
      const invalidId = [
         {},
         { id: 0 },
         { id: -1 },
         { id: null },
         { id: [] },
         { id: {} }
      ];
      const data = {
         title: "dammy",
         body: "dammy"
      };
      invalidId.forEach(async (id) => {
         const res = await Helper.request({
            method: "put",
            endPoint: `/api/todo/${id}`,
            statusCode: 400
         }).send(data);

         assert.equal(res.body, {
            message: "id?"
         })
      })
   });

   it("title?", async () => {
      const data = {
         title: undefined || null,
         body: "dammy"
      };
      const res = await Helper.request({
         method: "put",
         endPoint: `/api/todo/${currentId}`,
         statusCode: 400
      }).send(data);

      assert.deepEqual(res.body, {
         message: "title?"
      })
   });

   it("body?", async () => {
      const data = {
         title: "dammy",
         body: null || undefined,
      }

      const updatedTodo = async () => {
         const res = await Helper.request({
            method: "put",
            endPoint: `/api/todo/${currentId}`,
            statusCode: 400
         }).send(data)
         return res.body;
      };
      const resp = await updatedTodo()

      assert.deepEqual(resp, {
         message: "body?"
      })
   });

   it("idは不正", async () => {
      const data = {
         title: "dammy",
         body: "dammy",
      };
      const res = await Helper.request({
         method: "put",
         endPoint: `/api/todo/${INVARID_ID}`,
         statusCode: 400
      }).send(data);

      assert.deepEqual(res.body, {
         message: "idが不正です"
      })
   });

   it("正常なテスト", async () => {
      const oldTodos = await getTodos()

      const data = {
         title: "dammy",
         body: "dammy"
      };

      const res = await Helper.request({
         method: "put",
         endPoint: `/api/todo/${currentId}`,
         statusCode: 200
      }).send(data);
      const updatedTodo = await res.body;

      assert.deepEqual(updatedTodo, {
         id: currentId,
         title: data.title,
         body: data.body,
         createdAt: updatedTodo.createdAt,
         updatedAt: updatedTodo.updatedAt,
      });

      const newTodos = await getTodos();

      assert.equal(oldTodos.length, newTodos.length);
      assert.equal(updatedTodo.createdAt < updatedTodo.updatedAt, true);
      assert.deepEqual(newTodos[currentId - 1], updatedTodo);
   })



})