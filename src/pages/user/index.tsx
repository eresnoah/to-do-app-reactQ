import { UserProfile, useUser } from "@clerk/nextjs";
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
        <UserProfile />
      </section>
    );
  }