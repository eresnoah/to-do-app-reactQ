import classes from "./Layout.module.css";
import { UserButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

const layoutDesign = {
  margin: "3rem auto",
  width: "90%",
  maxWidth: "40rem",
};

function Layout(props: any) {
  return (
    <div>
      <header className={classes.header}>
        <ul className={classes.header}>
          <li>
            <div className={classes.logo}>To-Do-App</div>
          </li>
          <li>
            <Link href="/">homepage</Link>
          </li>
          <li>
            <Link href="/user">user</Link>
          </li>
          <li>
            <div>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  userProfileMode="navigation"
                  userProfileUrl={`http://localhost:3000/user`}
                />
              </SignedIn>
            </div>
          </li>
        </ul>
      </header>
      <main style={layoutDesign}> {props.children}</main>
    </div>
  );
}

export default Layout;
