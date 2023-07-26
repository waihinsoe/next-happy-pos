import { Box, Typography } from "@mui/material";
import MainLogo from "@/assets/main-logo.png";
import Image from "next/image";
const Footer = () => {
  return (
    <Box
      sx={{
        minHeight: 150,
        bgcolor: "#4C4C6D",
        px: "12px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          m: "0 auto",
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Indaw <br />
              AungChanThar Street 12 <br />
              contact@happypos.com
              <br />
              +959 268 362 443
            </Typography>
          </Box>
          <Box sx={{ width: "120px", position: "relative" }}>
            <Image
              style={{ width: "100%", height: "100%" }}
              src={MainLogo}
              alt="mainlogo"
            />
          </Box>
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Order App <br />
              Backoffice App
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
