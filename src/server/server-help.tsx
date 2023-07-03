import zod from "zod";
import jwt from "jsonwebtoken";
import { error } from "console";
import { Todo } from "./main";

const newTodoSchema = zod.object({
  text: zod.string(),
  deadline: zod.string(),
  userId: zod.string(),
});

const editTodoScema = zod.object({
  text: zod.string(),
  deadline: zod.string(),
  userId: zod.string(),
  id: zod.string(),
});

function getPublicKey(authToken: string | undefined) {
  let publicKey: string = "";

  if (authToken != undefined) {
    if (process.env.CLERK_JWT_VERIFICATION_KEY) {
      const splitKey = process.env.CLERK_JWT_VERIFICATION_KEY.match(/.{1,64}/g);
      if (splitKey != null) {
        publicKey =
          "-----BEGIN PUBLIC KEY-----\n" +
          splitKey.join("\n") +
          "\n-----END PUBLIC KEY-----";
      }
    }
  }
  return publicKey;
}

export function getUserId(authHeader: any) {
  let userId: string = "";
  const authToken = authHeader?.split(" ")[1];
  const publicKey: string = getPublicKey(authToken);

  if (authToken != undefined && publicKey != "") {
    const decodedKey = jwt.verify(authToken, publicKey);
    const parsedKey = JSON.parse(JSON.stringify(decodedKey));
    const decodedUserId: string = "sub" in parsedKey ? parsedKey.sub : error;
    userId = decodedUserId;
  }

  return userId;
}

export function parseNewTodo(body: any, userId: string) {
  const parsedNewTodo = newTodoSchema.parse(body);

  console.log(parsedNewTodo.deadline);

  const newTodo = {
    id: generateID(),
    text: parsedNewTodo.text,
    deadline: new Date(parsedNewTodo.deadline),
    userId: userId,
  };

  return newTodo;
}

export function parseEditTodo(body: any, userId: string) {
  const parsedEditTodo = editTodoScema.parse(body);

  console.log(parsedEditTodo.deadline);

  const editTodo = {
    id: parsedEditTodo.id,
    text: parsedEditTodo.text,
    deadline: new Date(parsedEditTodo.deadline),
    userId: userId,
  };

  return editTodo;
}

export function generateID() {
  function randStr(length: number) {
    const chars = [
      ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    ];
    return [...Array(length)]
      .map(() => chars[Math.trunc(Math.random() * chars.length)])
      .join("");
  }
  const time: string = String(Date.now());
  const timeEnd = time.slice(Math.ceil(time.length / 2));
  const timeStart = time.slice(0, Math.ceil(time.length / 2));

  const ID: string = `TODO-${timeEnd}-${randStr(6)}-${timeStart}`;
  return ID;
}

export function sortTodos(todos: Todo[]) {
  todos.sort((a, b) => a.deadline.valueOf() - b.deadline.valueOf())
  return todos
}
