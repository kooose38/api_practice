const assert = require("power-assert");
const request = require("supertest");
const app = require("../../app");

describe("/api/todo API GETメソッド", () => {
   it("response body is correct?", async () => {
      const res = await request(app)
         .get("/api/todo")
         .set("Accept", "application/json")
         .expect("Content-Type", /application\/json/)
         .expect(200)


      const todos = res.body;
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