import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import classes from "./Classes.module.css";
import Card from "./Card";
import { useAuth, useUser } from "@clerk/nextjs";
import postTodo from "../pages/api/post-todo";

interface ToDoFormProps {
  postHandler: (formValues: {
    text: string;
    userId: string;
    deadline: string;
    userToken: string;
  }) => void;
}

function ToDoForm(props: ToDoFormProps) {
  const [deadline, setDeadline] = useState("");
  const [text, setText] = useState("");
  const { user } = useUser();
  const { getToken } = useAuth();
  const { postHandler } = props;
  const today = new Date().toISOString().split("T")[0];

  function resetForm() {
    setDeadline("");
    setText("");
  }

  async function handleSubmit(event: FormEvent) {
    //prevent page reload
    event.preventDefault();
    const userToken = await getToken();

    if (user != undefined && user != null && userToken != null) {
      const formValues = {
        deadline: deadline,
        text: text,
        userId: user.id,
        userToken: userToken,
      };
      postHandler(formValues);
      resetForm();
    } else {
      console.log("user not found");
    }
  }

  return (
    <section>
      <Card>
        <form className={classes.form} onSubmit={handleSubmit}>
          <b>NEW TODO</b>
          <p>Use this form to post a new todo</p>
          <div className={classes.control}>
            <label htmlFor="deadline">Deadline: </label>
            <input
              value={deadline}
              min={today}
              onChange={(event) => setDeadline(event.target.value)}
              type="date"
              id="deadline"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Task: </label>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              type="text"
              id="text"
              required
            />
          </div>
          <div className={classes.actions}>
            <button>submit</button>
          </div>
        </form>
      </Card>
    </section>
  );
}

export default ToDoForm;
