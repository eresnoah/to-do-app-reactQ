import axios from "axios";

export default async function removeTodo(todoId: string) {
    const deleteObj = JSON.stringify({
        id: todoId
    })

    await axios.post("/todos/remove", deleteObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
}