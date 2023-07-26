import { Avatar, Box, Paper, Slide, Typography } from "@mui/material";
import pic1 from "@/assets/pic1.jpeg";
import Image from "next/image";

const testimonials = [
  {
    name: "Zaw Naing",
    company: "Tasty Foods Co. Ltd",
    avatar: pic1,
    description: `We increased our sale by 120% during the first 3 months of using Happy POS. Easy and simple to use.
     Super duper recommended for everyone who are less tech savy, 5/5`,
  },
  {
    name: "Ko Thu",
    company: "Awa Sar Co. Ltd",
    avatar: pic1,
    description: `Our customers love Happy POS. Quick and easy with QR code ordering. We now spend more time taking care of our customers instead of taking orders manually. Thanks to Happy POS! `,
  },
  {
    name: "Myint Htike Aung",
    company: "Swey Mel Co. Ltd",
    avatar: pic1,
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. Happy POS customer service is a top-notch! They are always there when we need help. 5 starssss!`,
  },
];

const Testimonial = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        minHeight: 350,
        rowGap: 3,
        columnGap: 2,
        my: 5,
      }}
    >
      {testimonials.map((item) => {
        return (
          <Slide direction="up" in={true} key={item.description}>
            <Paper
              sx={{
                width: 300,
                height: 180,
                p: 2,
                borderRadius: 3,
                position: "relative",
                bgcolor: "#1B9C85",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar alt={item.name} sx={{ mr: 2 }}>
                  <Image src={item.avatar} alt={item.name} fill />
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      color: "#E8F6EF",
                      fontSize: "14px",
                      fontStyle: "italic",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#E8F6EF",
                      fontSize: "14px",
                      fontStyle: "italic",
                    }}
                  >
                    {item.company}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", color: "#E8F6EF" }}
              >
                {item.description}
              </Typography>
            </Paper>
          </Slide>
        );
      })}
    </Box>
  );
};

export default Testimonial;
