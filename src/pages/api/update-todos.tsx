import axios from "axios";
import { Todo } from "../../server/main";

export default async function updateTodos(userId: string) {
  console.log("the query key is ", userId);
  const todos: Todo[] = await getUserTodos(userId).then((data) => {
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

async function getUserTodos(userId: string) {
  const {data} = await axios.post("/usertodos", {id: userId}, {
    headers: { "Content-Type": "application/json" },
  });

  return data;
}
