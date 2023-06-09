import axios from "axios";

export default async function removeTodo(todoId: string) {
    const deleteObj = JSON.stringify({
        id: todoId
    })

    await axios.post("http://localhost:3001/todos/remove", deleteObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
}