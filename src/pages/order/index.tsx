import { OrderContext } from "@/contexts/OrderContext";
import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";

const Order = () => {
  const { menuCategories, menus } = useContext(OrderContext);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState(
    menuCategories[0]
  );
  console.log("menuCategories", menuCategories);
  return (
    <Box>
      {menuCategories &&
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
