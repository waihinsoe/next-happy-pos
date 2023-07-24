import MenuCard from "@/components/MenuCard";
import ViewCardBar from "@/components/ViewCardBar";
import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";
import { getMenusByMenuCategoryId } from "@/utils";
import { Box, Tab, Tabs } from "@mui/material";
import { menu_categories as MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Order = () => {
  const router = useRouter();
  const query = router.query;
  const selectedLocationId = query.locationId as string;
  const { menuCategories, menus, menusMenuCategoriesLocations } =
    useAppSelector(orderAppData);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();
  const [value, setValue] = useState(0);

  const renderMenus = () => {
    if (!selectedMenuCategory) return;
    const menuCategoryId = String(selectedMenuCategory.id);
    const validMenus = getMenusByMenuCategoryId(
      menus,
      menusMenuCategoriesLocations,
      menuCategoryId,
      selectedLocationId
    );
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2, px: 2 }}>
        {validMenus.length ? (
          validMenus.map((menu) => {
            const href = { pathname: `/order/menus/${menu.id}`, query };
            return <MenuCard key={menu.id} href={href} menu={menu} />;
          })
        ) : (
          <h1>Menu not found</h1>
        )}
      </Box>
    );
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
          variant="scrollable"
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
      <ViewCardBar />
    </Box>
  );
};

export default Order;
