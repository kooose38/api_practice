//server dev
const express = require("express");
const app = express();
const todoRouter = require("./routers/todo")

//body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/", todoRouter);

module.exports = app;