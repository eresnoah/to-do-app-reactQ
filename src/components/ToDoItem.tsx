import removeTodo from "../pages/api/remove-todo";
import { Todo } from "../server/main";
import Card from "./Card";
import classes from "./Classes.module.css";

interface ToDoItemProps {
  todo: Todo,
  deleteHandler: (todoId: string) => void
}
function ToDoItem(props: ToDoItemProps) {
  const {todo, deleteHandler } = props
  const formattedDeadline: string = new Date(todo.deadline).toLocaleDateString("en-GB")

  function handleDelete() {
    deleteHandler(todo.id)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{formattedDeadline}</h3>
          <p>{todo.text}</p>
          <p>ToDo ID: {todo.id}</p>
          <p>User ID: {todo.user}</p>
          <button onClick={handleDelete}>delete</button>
        </div>
      </Card>
    </li>
  );
}


export default ToDoItem;
