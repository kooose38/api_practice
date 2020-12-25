const assert = require("power-assert");
const Helper = require("../requestHelper")



describe("/api/todo API GETメソッド", () => {
   it("response body is correct?", async () => {
      const res = await Helper.request({
         method: "get",
         endPoint: "/api/todo",
         statusCode: 200
      });


      const todos = await res.body;
      assert.equal(Array.isArray(todos), true);
      todos.forEach(todo => {
         assert.equal(typeof todo.id === "number", true)
         assert.equal(typeof todo.title === "string", true)
         assert.equal(typeof todo.body === "string", true)
         assert.equal(typeof todo.createdAt === "string", true)
         assert.equal(typeof todo.updatedAt === "string", true)
      })
   });
})