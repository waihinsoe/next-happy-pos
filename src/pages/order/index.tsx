import { OrderContext } from "@/contexts/OrderContext";
import { menu_categories as MenuCategory } from "@prisma/client";
import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Order = () => {
  const { menuCategories, menus } = useContext(OrderContext);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();
  console.log("menuCategories", menuCategories);
  useEffect(() => {
    setSelectedMenuCategory(menuCategories[0]);
  }, [menuCategories]);
  return (
    <Box>
      {menuCategories &&
        selectedMenuCategory &&
        menuCategories.map((menuCategory) => {
          return (
            <Button
              key={menuCategory.id}
              variant={
                menuCategory.id === selectedMenuCategory.id
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setSelectedMenuCategory(menuCategory)}
            >
              {menuCategory.name}
            </Button>
          );
        })}
    </Box>
  );
};

export default Order;
