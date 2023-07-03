import styled from "styled-components";
import Card from "./Card";
import { Todo } from "../server/main";
import classes from "./Classes.module.css";
import { FormEvent, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export const ClickButton = styled.div`
  background: powderblue;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  width: 90px;
  text-align: center;
`;
const PopupCard = styled.div`
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -280px;
  padding: 40px;
  transform: translateY(-50%. -50%);
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.75);
`;

interface EditFormProps {
  togglePopup: (event: React.MouseEvent<HTMLElement> | FormEvent) => void;
  editHandler: (editValues: {userToken: Promise<string|null>, todo: Todo}) => void;
  todo: Todo;
}

function formatDeadline(deadline: Date) {
  const formattedDeadline: string = new Date(deadline).toLocaleDateString(
    "en-GB"
  );
  return formattedDeadline;
}

export default function EditForm(props: EditFormProps) {
  const {getToken} = useAuth()
  const { todo, togglePopup, editHandler } = props;
  const [text, setText] = useState(todo.text);
  const [deadline, setDeadline] = useState(formatDeadline(todo.deadline));
  const today = new Date().toISOString().split("T")[0]

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    const editedTodo: Todo = {
      id: todo.id,
      userId: todo.userId,
      deadline: new Date(deadline),
      text: text,
    };
    const editValues = {
      userToken: getToken(),
      todo: editedTodo
    }

    editHandler(editValues);
    togglePopup(event)
  }

  return (
    <Overlay>
      <PopupCard>
        <section>
          <Card>
            <form className={classes.form} onSubmit={submitForm}>
              <b>Edit todo: {todo.id}</b>
              <p>Date: {formatDeadline(todo.deadline)}</p>
              <p>Text: {todo.text}</p>
              <div className={classes.control}>
                <label>Edit deadline: </label>
                <input
                  min={today}
                  type="date"
                  onChange={(event) => setDeadline(event.target.value)}
                  required
                ></input>
              </div>
              <div className={classes.control}>
                <label>Edit text: </label>
                <input
                  type={text}
                  onChange={(event) => setText(event.target.value)}
                  required
                ></input>
              </div>
              <p>update todo?</p>
              <button onClick={togglePopup}>No</button>
              <button>Yes</button>
            </form>
          </Card>
        </section>
      </PopupCard>
    </Overlay>
  );
}
