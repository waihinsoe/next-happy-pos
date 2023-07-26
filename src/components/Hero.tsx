import { AddBoxRounded } from "@mui/icons-material";
import { Box, Button, Slide, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        mt: "250px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Slide
        direction="down"
        in={true}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <Box>
          <Typography
            sx={{
              maxWidth: 700,
              mb: 4,
              fontSize: { xs: "16px", md: "25.5px" },
            }}
          >
            Manage your menu catelog easily with Happy POS and entice your
            customers with QR code ordering system.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                width: "fit-content",
                backgroundColor: "#4C4C6D",
              }}
            >
              order app
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                width: "fit-content",
                backgroundColor: "#4C4C6D",
              }}
            >
              backoffice app
            </Button>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default Hero;
