import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { getSelectedLocationId } from "@/utils";
import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import NewMenu from "./NewMenu";
import defaultPhoto from "../../../assets/default-photo.jpg";

const Menus = () => {
  const [open, setOpen] = useState(false);
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
    <Layout title="Menus">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#4C4C6D",
            color: "#E8F6EF",
            width: "fit-content",
            ":hover": {
              bgcolor: "#1B9C85", // theme.palette.primary.main
              color: "white",
            },
          }}
        >
          NewMenu
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredMenus.length > 0 &&
          filteredMenus.map((menu) => (
            <Link
              href={`/backoffice/menus/${menu.id}`}
              key={menu.id}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ maxWidth: 200, height: 200 }}>
                <CardMedia
                  sx={{ height: 100 }}
                  image={`${menu.asset_url}`}
                  component={"img"}
                />
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
      <NewMenu open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menus;
