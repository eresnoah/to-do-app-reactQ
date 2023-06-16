import axios from "axios";

export default async function postTodo(formValues: {
  text: string;
  user: string;
  deadline: string;
}) {
  const newTodo = JSON.stringify({
    text: formValues.text,
    user: formValues.user,
    deadline: formValues.deadline,
  });
  await axios.post("/todos", newTodo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}