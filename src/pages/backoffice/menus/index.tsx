import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

import { getSelectedLocationId } from "@/utils";
import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useContext(BackOfficeContext);
  // const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
  //   null
  // );
  const selectedLocationId = getSelectedLocationId();
  // useEffect(() => {
  //   setSelectedLocationId(localStorage.getItem("selectedLocation"));
  // }, []);

  // if (selectedLocationId === null) return;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => {
      return item.locations_id === Number(selectedLocationId);
    })
    .map((menusLocation) => menusLocation.menus_id);

  const filteredMenus = menus.filter(
    (menu) => menu.id && validMenuIds.includes(menu.id)
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
          href={"/menus/create"}
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
              href={`/menus/${menu.id}`}
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
