import {
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { config } from "../config/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { BackOfficeContext } from "../contexts/BackOfficeContext";
import Layout from "./Layout";

const Login = () => {
  const { updateData, ...data } = useContext(BackOfficeContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const SignIn = async () => {
    const isValid = user.email.length > 0 && user.password.length > 0;
    if (!isValid) return setOpen(true);
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const responseData = await response.json();
        updateData({ ...data, accessToken: responseData.accessToken });
        localStorage.setItem("accessToken", responseData.accessToken);
        return router.push("/");
      }
    } catch (err) {
      console.log("Error here: ", err);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return event;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Layout title="Login">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Please enter email and password"
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            minWidth: 400,
            mt: 5,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            onKeyDown={(evt) => {
              if (evt.key === "Enter") {
                SignIn();
              }
            }}
            onChange={(evt) => setUser({ ...user, email: evt.target.value })}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            sx={{ mb: 2 }}
            onKeyDown={(evt) => {
              if (evt.key === "Enter") {
                SignIn();
              }
            }}
            onChange={(evt) => setUser({ ...user, password: evt.target.value })}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              mt: 5,
            }}
          >
            <Button variant="contained" onClick={SignIn}>
              Log in
            </Button>
            <Link href="/register">
              <Typography variant="body1" sx={{ mt: 2 }}>
                Register
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
