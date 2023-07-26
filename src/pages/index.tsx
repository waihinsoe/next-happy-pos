import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import { Box } from "@mui/material";

const HappyPOS = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Header />
      <Box
        sx={{
          m: "0 auto",
          maxWidth: { md: "100%", lg: "1280px" },
          px: { xs: "10px", md: "15px" },
        }}
      >
        <Hero />
        <Features />
        <Testimonial />
      </Box>
      <Footer />
    </Box>
  );
};

export default HappyPOS;
