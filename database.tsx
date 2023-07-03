import { JsonDB, Config } from "node-json-db";
import { Todo } from "./src/server/main";

const db = new JsonDB(new Config("users", true, false, "/"));

export async function pushTodo(userId: string, todo: Todo) {
  await db.push(`/users/${userId}/todos/${todo.id}`, todo as Todo);
}

export async function readTodos(userId: string) {
  const todos: Todo[] = []
  const data = await db.getData(`/users/${userId}/todos`)
  for (const key in data) {
    const todo = await db.getObject<Todo>(`/users/${userId}/todos/${key}`)
    todos.push(todo)
  }
  return todos;
}

export async function removeTodo(userId: string, todoId: string) {
  await db.delete(`/users/${userId}/todos/${todoId}`);
}