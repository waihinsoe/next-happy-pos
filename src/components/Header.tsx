import { Box, Slide, Typography } from "@mui/material";
import Image from "next/image";
import HeaderImg from "@/assets/wave.svg";
import PandaCooking from "@/assets/panda-cooking.png";
const Header = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 300,
        position: "fixed",
        top: 0,
        zIndex: 5,
      }}
    >
      <Image
        src={HeaderImg}
        style={{
          width: "100%",
          padding: 0,
          margin: 0,
          objectFit: "cover",
        }}
        alt="header-image"
      />
      <Slide
        direction="left"
        in={true}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "absolute",
            right: 0,
            width: { xs: "80%", md: "50%", lg: "30%" },
            display: { xs: "none", md: "block" },
            textAlign: "right",
          }}
        >
          <Image src={PandaCooking} alt="header-image" />
        </Box>
      </Slide>
      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          fontWeight: "bold",
          mt: 4,
          color: "#4C4C6D",
        }}
      >
        Happy POS
      </Typography>
    </Box>
  );
};

export default Header;
