import classes from "./Layout.module.css";
import { UserButton, SignedIn } from "@clerk/nextjs";

const layoutDesign = {
  margin: "3rem auto",
  width: "90%",
  maxWidth: "40rem",
};

function Layout(props: any) {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>To-Do-App</div>
        <div>
          <SignedIn>
            <UserButton  afterSignOutUrl="/"/>
          </SignedIn>
        </div>
      </header>
      <main style={layoutDesign}> {props.children}</main>
    </div>
  );
}

export default Layout;
