import { useContext } from "react";
import Layout from "../../components/Layout";
import { AppContext } from "@/contexts/BackOfficeContext";
import { Button } from "@mui/material";
import { useSession, signOut, signIn } from "next-auth/react";

function App() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div>
        {session && session.user ? (
          <>
            Signed in as {session.user.email} <br />
            <Button variant="contained" onClick={() => signOut()}>
              Sign outs
            </Button>
          </>
        ) : (
          <>
            Not signed in <br />
            <Button variant="contained" onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;
