import ToDoItem from "./ToDoItem";
import ToDoForm from "./ToDoForm";
import EditForm from "./EditForm";
import classes from "./Classes.module.css";
import { Todo } from "../server/main";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { usePost, useEdit, useRemove, useTodos } from "../hooks/hooks";

const placeholderTodo: Todo = {
  id: "placeholder",
  userId: "placeholder",
  deadline: new Date(),
  text: "placeholder",
};

export default function ToDoList() {
  const { getToken } = useAuth();
  const [editTodo, setEditTodo] = useState<Todo>(placeholderTodo);
  const { isSignedIn } = useUser();
  const { data: todos, isLoading } = useTodos(getToken());
  const post = usePost();
  const remove = useRemove();
  const edit = useEdit();

  function showEditForm() {
    return (
      <EditForm
        togglePopup={() => {
          setEditTodo(placeholderTodo);
        }}
        todo={editTodo}
        editHandler={edit.mutate}
      ></EditForm>
    );
  }

  if (isLoading) return <div>Loading todos...</div>;

  if (isSignedIn) {
    return (
      <div>
        {editTodo != placeholderTodo && showEditForm()}
        <ul className={classes.list}>
          <li>
            <ToDoForm postHandler={post.mutate} />
          </li>
          {isLoading && <li>Loading todos...</li>}
          {todos !== undefined && (
            <div>
              {todos.map((todo: Todo) => (
                <ToDoItem
                  key={todo.id}
                  todo={todo}
                  deleteHandler={remove.mutate}
                  editHandler={setEditTodo}
                />
              ))}
            </div>
          )}
        </ul>
      </div>
    );
  }

  return <div>Loading user...</div>;
}
