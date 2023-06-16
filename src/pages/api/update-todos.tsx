import axios from "axios";
import { Todo } from "../../server/main";

type userToken = Promise<string | null>;

export default async function updateTodos(userToken: userToken) {
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
  const { data } = await axios.post(
    "/usertodos",
    { userStatus: JSON.stringify(userToken) },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return data;
}
