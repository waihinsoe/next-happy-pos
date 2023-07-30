import TopBar from "@/components/TopBar";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
const Login = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", zIndex: 999 }}>
        <TopBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E8F6EF",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign In with google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
