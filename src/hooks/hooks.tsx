import { useMutation, useQuery, useQueryClient } from "react-query";
import { postTodo, removeTodo, editTodo, updateTodos } from "../pages/api/api";
import { userToken } from "../pages/api/api";

export function useTodos(userToken: userToken) {
  return useQuery(["todos", userToken], () => updateTodos(userToken));
}

export function usePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useRemove() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useEdit() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: editTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });
  }