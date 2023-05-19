import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Menu } from "../typings/types";
import { config } from "../config/config";
import Layout from "./Layout";

const MenuDetail = () => {
  const { menus, addonCategories } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const { menuId } = useParams();
  let menu: Menu | undefined;
  if (menuId) {
    menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
  }
  const [newMenu, setNewMenu] = useState({
    name: "",
    price: 0,
  });

  useEffect(() => {
    if (menu) {
      setNewMenu({ name: menu?.name, price: menu?.price });
    }
  }, [menu]);

  const updateMenu = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menus/${menu?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newMenu),
    });
    console.log(await response.json());
  };
  return (
    <Layout>
      <Box>
        {menu ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: 2,
              margin: "auto",
              maxWidth: "400px",
              mt: 2,
            }}
          >
            <TextField
              id="name"
              label="name"
              variant="outlined"
              defaultValue={menu.name}
              onChange={(evt) => {
                setNewMenu({ ...newMenu, name: evt.target.value });
              }}
            />
            <TextField
              id="price"
              label="price"
              variant="outlined"
              defaultValue={menu.price}
              type="number"
              onChange={(evt) => {
                setNewMenu({ ...newMenu, price: parseInt(evt.target.value) });
              }}
            />
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={addonCategories}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="menuCategories"
                  placeholder="Favorites"
                />
              )}
            />
            <Button variant="contained" onClick={updateMenu}>
              Update
            </Button>
          </Box>
        ) : (
          <h1>menu not found</h1>
        )}
      </Box>
    </Layout>
  );
};

export default MenuDetail;
