import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import classes from "./Classes.module.css";
import Card from "./Card";
import { useUser } from "@clerk/nextjs";
import postTodo from "../pages/api/post-todo";

interface ToDoFormProps {
  postHandler: (formValues: {
    text: string;
    user: string;
    deadline: string;
  }) => void;
}

function ToDoForm(props: ToDoFormProps) {
  const [deadline, setDeadline] = useState("");
  const [text, setText] = useState("");
  const { user } = useUser();
  const { postHandler } = props;

  function resetForm() {
    setDeadline("");
    setText("");
  }

  async function handleSubmit(event: FormEvent) {
    //prevent page reload
    event.preventDefault();

    if (user != undefined && user != null) {
      const formValues = {
        deadline: deadline,
        text: text,
        user: user.id,
      };

      postHandler(formValues);
      resetForm();
    } else {
      console.log("user not found");
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="deadline">Deadline: </label>
          <input
            value={deadline}
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
  );
}

export default ToDoForm;
