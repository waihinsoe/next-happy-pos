import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import Layout from "./Layout";
const Menus = () => {
  const { menus, menusLocations } = useContext(AppContext);
  const selectedLocationId = localStorage.getItem("selectedLocation");

  const validMenuLocations = menusLocations
    .filter((menusLocation) => {
      return String(menusLocation.locations_id) === selectedLocationId;
    })
    .map((menusLocation) => menusLocation.menus_id);

  const filteredMenus = menus.filter(
    (menu) => menu.id && validMenuLocations.includes(menu.id)
  );

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          to={"/menus/create"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box
            sx={{
              width: "250px",
              height: "250px",
              border: "2px dotted lightgray",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <AddIcon fontSize="large" />
            <Typography>Add New Menu</Typography>
          </Box>
        </Link>
        {filteredMenus &&
          filteredMenus.map((menu) => (
            <Link
              to={`/menus/${menu.id}`}
              key={menu.id}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ maxWidth: 250, height: 250 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`${menu.asset_url}`}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {menu.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
      </Box>
    </Layout>
  );
};

export default Menus;
