import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { getSelectedLocationId } from "@/utils";
import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useContext(BackOfficeContext);
  const selectedLocationId = getSelectedLocationId();

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
          href={"/backoffice/menus/create"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box
            sx={{
              width: "200px",
              height: "200px",
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
              href={`/backoffice/menus/${menu.id}`}
              key={menu.id}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ maxWidth: 200, height: 200 }}>
                <CardMedia sx={{ height: 100 }} image={`${menu.asset_url}`} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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
