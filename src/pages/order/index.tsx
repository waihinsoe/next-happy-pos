import { OrderContext } from "@/contexts/OrderContext";
import { menu_categories as MenuCategory } from "@prisma/client";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Order = () => {
  const { menuCategories, menus, menusMenuCategoriesLocations } =
    useContext(OrderContext);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();
  const [value, setValue] = useState(0);

  const renderMenus = () => {
    return <h1>{selectedMenuCategory?.name}</h1>;
  };

  useEffect(() => {
    if (menuCategories) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  if (!selectedMenuCategory) return null;
  return (
    <Box width={"100%"}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(evt, value) => setValue(value)}
          aria-label="menuCategories"
        >
          {menuCategories.length &&
            menuCategories.map((item) => {
              return (
                <Tab
                  label={item.name}
                  key={item.id}
                  onClick={() => setSelectedMenuCategory(item)}
                />
              );
            })}
        </Tabs>
      </Box>
      {renderMenus()}
    </Box>
  );
};

export default Order;
