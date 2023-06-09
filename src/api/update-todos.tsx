import axios from "axios";
import { Todo } from "../server/main";

export default async function updateTodos() {
  const todos: Todo[] = await getTodos().then((data) => {
    console.log("this is the data: ", data);

    const loadedTodos: Todo[] = [];
    for (const key in data) {
      const todo: Todo = {
        id: key,
        ...data[key],
      };
      loadedTodos.push(todo);
    }
    return loadedTodos;
  });

  return todos;
}

async function getTodos() {
  const { data } = await axios.get("http://localhost:3001/todos");
  return data;
}
