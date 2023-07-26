import { Box, Typography, Zoom } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
const features = [
  {
    iconName: MenuBookIcon,
    text: "Easily manage your menus with Happy POS",
    delay: "1000ms",
  },
  {
    iconName: QrCode2Icon,
    text: "Scan and order. Quick and easy! Your customers will love it!",
    delay: "1300ms",
  },
  {
    iconName: LocationOnIcon,
    text: "Happy POS supports multiple locations for your business.",
    delay: "1500ms",
  },
  {
    iconName: ChecklistIcon,
    text: "Backoffice and order apps are included in every subscription.",
    delay: "1700ms",
  },
  {
    iconName: SupportAgentIcon,
    text: "Dedicated customer support so that we are always here to help you. ",
    delay: "2000ms",
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        mt: 15,
        justifyContent: "center",
      }}
    >
      {features.map((item) => {
        return (
          <Zoom
            key={item.text}
            in={true}
            style={{
              transitionDelay: true ? item.delay : "0ms",
              transitionDuration: "1000ms",
            }}
          >
            <Box sx={{ maxWidth: 330, textAlign: "center", mb: 10, px: 5 }}>
              <item.iconName sx={{ fontSize: "90px", color: "#1B9C85" }} />
              <Typography variant="h6">{item.text}</Typography>
            </Box>
          </Zoom>
        );
      })}
    </Box>
  );
};

export default Features;
