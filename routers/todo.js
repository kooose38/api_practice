const express = require("express");
const router = express.Router();
const controller = require("../contorllers/controller");

router
   .route("/api/todo")
   .get(controller.getTodo)
   .post(controller.postTodo)


module.exports = router;