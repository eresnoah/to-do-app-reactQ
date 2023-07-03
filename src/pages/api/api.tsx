import axios from "axios";
import { Todo } from "../../server/main";

export type userToken = Promise<string | null>;

interface EditValues {
  userToken: userToken;
  todo: Todo;
}

export async function editTodo(editValues: EditValues) {
  const { userToken, todo } = editValues;
  await axios.post("/api/todos/edit", JSON.stringify(todo), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await userToken}`,
    },
  });
}

export async function postTodo(formValues: {
  text: string;
  userId: string;
  deadline: string;
  userToken: string;
}) {
  const newTodo = JSON.stringify({
    text: formValues.text,
    userId: formValues.userId,
    deadline: formValues.deadline,
  });
  await axios.post("/api/todos/new", newTodo, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${formValues.userToken}`,
    },
  });
}

export async function removeTodo(itemValues: {
  todoId: string;
  userToken: string;
}) {
  const deleteObj = JSON.stringify({
    id: itemValues.todoId,
  });

  await axios.post("/api/todos/remove", deleteObj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${itemValues.userToken}`,
    },
  });
}

export async function updateTodos(userToken: userToken) {
  console.log("the user token is ", userToken);
  const todos: Todo[] = await getUserTodos(userToken).then((data) => {
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

async function getUserTodos(userToken: userToken) {
  const { data } = await axios.get("/api/todos", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await userToken}`,
    },
  });

  return data;
}
