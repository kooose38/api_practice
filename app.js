//server dev
const express = require("express");
const app = express();
const todoRouter = require("./routers/todo")


app.use("/", todoRouter);

module.exports = app;