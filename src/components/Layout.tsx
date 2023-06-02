import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NavBar, { sidebarMenuItems } from "./NavBar";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
};

const Layout = (props: Props) => {
  return (
    <Box>
      <NavBar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            minWidth: 250,
            backgroundColor: "#1B9C85",
            borderTopRightRadius: "20px",
          }}
        >
          <List sx={{ p: 0 }}>
            {sidebarMenuItems.slice(0, 6).map((item) => (
              <Link
                href={item.route}
                key={item.id}
                style={{ textDecoration: "none", color: "#313131" }}
              >
                <ListItem
                  disablePadding
                  // sx={{ "&.hover": { backgroundColor: "blue" } }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#E8F6EF" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "#E8F6EF" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider
            variant="middle"
            sx={{ backgroundColor: "#FFE194", mt: 2 }}
          />
          <List>
            {sidebarMenuItems.slice(-1).map((item) => (
              <Link
                href={item.route}
                key={item.id}
                style={{ textDecoration: "none", color: "#313131" }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#E8F6EF" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "#E8F6EF" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Box sx={{ p: 3 }}>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
