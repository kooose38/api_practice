const assert = require("power-assert");
const Helper = require("../requestHelper");

const getTodos = async () => {
   const res = await Helper.request({
      method: "get",
      endPoint: "/api/todo",
      statusCode: 200
   })
   return res.body;
};

describe("POST API methods", () => {
   it("titleがない", async () => {
      const postData = {
         title: undefined | null,
         body: "dammy"
      };

      const postTodo = async () => {
         const res = await Helper.request({
            method: "post",
            endPoint: "/api/todo",
            statusCode: 400
         }).send(postData)
         return res.body
      }


      assert.deepEqual(await postTodo(), {
         message: "title?"
      })
   });

   it("bodyがない", async () => {
      const postData = {
         title: "dammy",
         body: undefined | null,
      };

      const postTodo = async () => {
         const res = await Helper.request({
            method: "post",
            endPoint: "/api/todo",
            statusCode: 400
         }).send(postData)
         return res.body
      }


      assert.deepEqual(await postTodo(), {
         message: "body?"
      })
   });

   it("正常なテスト", async () => {
      const oldTodos = await getTodos();

      const newdata = {
         title: "dammy",
         body: "dammy"
      }
      const postTodo = async () => {
         const res = await Helper.request({
            method: "post",
            endPoint: "/api/todo",
            statusCode: 200
         }).send(newdata)
         return res.body
      };

      const createdTodo = await postTodo();

      assert.deepEqual(createdTodo, {
         id: createdTodo.id,
         title: newdata.title,
         body: newdata.body,
         createdAt: createdTodo.createdAt,
         updatedAt: createdTodo.updatedAt,
      });
      const newTodos = await getTodos();

      assert.equal(oldTodos.length + 1, newTodos.length);
      assert.deepEqual(createdTodo, newTodos[createdTodo.id - 1])
   })
})