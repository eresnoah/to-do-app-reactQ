import express from "express";
import zod from "zod";
import "dotenv/config";
import { readTodos, removeTodo, pushTodo } from "../../database";
import { getUserId, parseNewTodo, parseEditTodo, sortTodos } from "./server-help";
import bcrypt from "bcrypt"

//testing hashing
const encriptionRounds = 5
const examplePassword = "nevermindme1234"
bcrypt.hash(examplePassword, encriptionRounds, (err, hash) => {
  console.log("this is the pass ", hash)
  bcrypt.compare(examplePassword, hash, (err, result) =>{
    if (result) {
      console.log("it is true")
    }
  } )
})

const app = express();

app.use(express.json());

const idSchema = zod.object({
  id: zod.string(),
});

export interface Todo {
  id: string;
  text: string;
  deadline: Date;
  userId: string;
}

app.get("/todos", (req, res) => {
  try {
    const userId = getUserId(req.headers.authorization);

    readTodos(userId).then((todos) => {
      const userTodos = sortTodos(todos)
      res.json(userTodos)
    })
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/todos/new", (req, res) => {
  try {
    const userId = getUserId(req.headers.authorization);
    const newTodo = parseNewTodo(req.body, userId);

    console.log(newTodo);

    pushTodo(userId, newTodo);

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/todos/remove", (req, res) => {
  try {
    const userId = getUserId(req.headers.authorization);
    const removeObj = idSchema.parse(req.body);

    removeTodo(userId, removeObj.id)

    res.status(201).json(removeObj.id);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/todos/edit", (req, res) => {
  try {
    const userId = getUserId(req.headers.authorization);
    const editTodo: Todo = parseEditTodo(req.body, userId);

    pushTodo(userId, editTodo);

    res.status(201).json(editTodo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
