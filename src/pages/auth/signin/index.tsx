import Layout from "@/components/Layout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
const Login = () => {
  return (
    <Layout title="Happy POS -Sign in">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign In with google
        </Button>
      </Box>
    </Layout>
  );
};

export default Login;
