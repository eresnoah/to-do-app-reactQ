import { Todo } from "../server/main";
import { useAuth } from "@clerk/nextjs";
import Card from "./Card";
import classes from "./Classes.module.css";

interface ToDoItemProps {
  todo: Todo;
  deleteHandler: (itemValues: { todoId: string; userToken: string }) => void;
  editHandler: (value: Todo) => void;
}
function ToDoItem(props: ToDoItemProps) {
  const { getToken } = useAuth();
  const { todo, deleteHandler, editHandler } = props;
  const formattedDeadline: string = new Date(todo.deadline).toLocaleDateString(
    "en-GB"
  );

  async function handleDelete() {
    await getToken().then((userToken) => {
      if (userToken != null) {
        deleteHandler({ todoId: todo.id, userToken: userToken });
      }
    });
  }

  return (
    <li className={classes.item}>
      <Card>
        <section>
          <button onClick={() => editHandler(todo)}>edit</button>
          <button onClick={handleDelete}>delete</button>
        </section>
        <div className={classes.content}>
          <h3>{formattedDeadline}</h3>
          <p>{todo.text}</p>
          <p>ToDo ID: {todo.id}</p>
          <p>User ID: {todo.userId}</p>
        </div>
      </Card>
    </li>
  );
}

export default ToDoItem;
