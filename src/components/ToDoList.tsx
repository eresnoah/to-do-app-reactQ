import ToDoItem from "./ToDoItem";
import ToDoForm from "./ToDoForm";
import classes from "./Classes.module.css";
import { Todo } from "../server/main";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import updateTodos from "../pages/api/update-todos";
import postTodo from "../pages/api/post-todo";
import removeTodo from "../pages/api/remove-todo";
import { useEffect } from "react";
import { Clerk } from "@clerk/nextjs/dist/types/server";

function useTodos(userId: string) {
  return useQuery(["todos", userId], () => updateTodos(userId));
}

function usePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

function useRemove() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export default function ToDoList() {
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const { data: todos, isLoading } = useTodos(
    user !== undefined && user !== null ? user.id : ""
  );
  const post = usePost();
  const remove = useRemove();

  useEffect(() => {
    if (isSignedIn) {
      let token = getToken().then((value) => {
        console.log(value)
      });
      console.log(token);
    }
  }, [isSignedIn]);

  if (isSignedIn) {
    return (
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
              />
            ))}
          </div>
        )}
      </ul>
    );
  }

  return <div>Loading user...</div>;
}
