import classes from "../components/Classes.module.css";
import ToDoList from "../components/ToDoList";
import { useAuth, useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <section>Loading auth...</section>;
  } else {
    if (!isSignedIn) {
      return <SignIn />;
    }
  }

  return (
    <section>
      <ul className={classes.list}>
        <li className={classes.item}>
          <ToDoList />
        </li>
      </ul>
    </section>
  );
}
