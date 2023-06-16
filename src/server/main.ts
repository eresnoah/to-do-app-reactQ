import express from "express";
import zod from "zod";
import "dotenv";
import generateID from "../pages/api/generate-id";
import dotenv from "dotenv";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

console.log(dotenv.config());

const app = express();

app.use(express.json());

const newTodoSchema = zod.object({
  text: zod.string(),
  deadline: zod.string(),
  user: zod.string(),
});

const idSchema = zod.object({
  id: zod.string(),
});

export interface Todo {
  id: string;
  text: string;
  deadline: Date;
  user: string;
}

const todos: Todo[] = [];

app.get("/todos", (_, res) => {
  res.json(todos);
});

app.post(
  "/usertodos",
  ClerkExpressWithAuth({
    // ...options
  }),
  (req, res) => {
    const userId = idSchema.parse(req.body).id;
    const userTodos: Todo[] = [];

    for (const todo of todos) {
      if (todo.user == userId) {
        userTodos.push(todo);
      }
    }
    res.json(userTodos);
  }
);

app.post("/todos", (req, res) => {
  try {
    const parsedNewTodo = newTodoSchema.parse(req.body);

    console.log(parsedNewTodo.deadline);

    const newTodo = {
      id: generateID(),
      text: parsedNewTodo.text,
      deadline: new Date(parsedNewTodo.deadline),
      user: parsedNewTodo.user,
    };

    console.log(newTodo);

    todos.push(newTodo);

    todos.sort((a, b) => {
      return a.deadline.getTime() - b.deadline.getTime();
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/todos/remove", (req, res) => {
  try {
    const deleteObj = idSchema.parse(req.body);

    for (let i = 0; i < todos.length; i++) {
      let deleted: boolean = false;
      if (todos[i].id == deleteObj.id) {
        const deletedTodo = todos.splice(i, 1);
        console.log(deletedTodo);
        deleted = true;
      }
      if (i == todos.length - 1 && !deleted) {
        console.log("ID not found");
      }
    }

    res.status(201).json(deleteObj.id);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});