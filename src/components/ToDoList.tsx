import ToDoItem from "./ToDoItem";
import ToDoForm from "./ToDoForm";
import classes from "./Classes.module.css";
import { Todo } from "../server/main";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import updateTodos from "../api/update-todos";
import postTodo from "../api/post-todo";
import removeTodo from "../api/remove-todo";

function useTodos() {
  return useQuery("todos", updateTodos);
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
  const { isSignedIn } = useUser();
  const { data: todos, isLoading } = useTodos();
  const post = usePost();
  const remove = useRemove();

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
