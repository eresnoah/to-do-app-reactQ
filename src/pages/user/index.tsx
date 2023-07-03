import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import Card from "../../components/Card";
import classes from "../../components/Classes.module.css";

export default function UserProfileHome() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState<File>();

  if (!isLoaded) {
    return <section>Loading auth...</section>;
  } else {
    if (!isSignedIn) {
      return <SignIn />;
    }
  }

  function isValidName(name: string) {
    if (name.trim().length == 0) {
      console.log("empty string")
      return false
    }
    if (name[0] == " ") {
      console.log("starts with zero string")
      return false
    }

    return true
  }

  async function updateFirstName(event: FormEvent) {
    event.preventDefault();
    if (isValidName(firstName)) {
      await user?.update({
        firstName: firstName,
      });
      setFirstName("");
    } else {console.log("First name cannot be empty or start with a space")}
  }

  async function updateLastName(event: FormEvent) {
    event.preventDefault();
    if (isValidName(lastName)) {
      await user?.update({
        lastName: lastName,
      });
      setLastName("");
    } else {console.log("Last name cannot be empty or start with a space")}
  }

  async function updateProfilePicture(event: FormEvent) {
    event.preventDefault();
    if (profilePicture != undefined) {
      user?.setProfileImage({ file: profilePicture });
    }
  }

  return (
    <section>
      <Card>
        <form className={classes.form}>
          <b>PROFILE SETUP</b>
          <p>
            Current name: {user.firstName} {user.lastName}
          </p>
          <div className={classes.control}> 
            <p>Current profile pic: </p>
            <img src={user.profileImageUrl} width = "300" height = "300"></img>
          </div>
          <div className={classes.control}>
            <label>First name: </label>
            <input
              value={firstName}
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <button onClick={updateFirstName}>Update</button>
          </div>
          <div className={classes.control}>
            <label>Last name: </label>
            <input
              value={lastName}
              type="text"
              onChange={(event) => setLastName(event.target.value)}
              required
            />
            <button onClick={updateLastName}>Update</button>
          </div>
          <div className={classes.control}>
            <label>Profile pic: </label>
            <input
              id="pfp"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                const files = event.currentTarget.files;
                if (files != null) {
                  if (files[0] != undefined) {
                    setProfilePicture(files[0]);
                  }
                }
              }}
            />{" "}
            <button onClick={updateProfilePicture}>Update</button>
          </div>
        </form>
      </Card>
    </section>
  );
}
