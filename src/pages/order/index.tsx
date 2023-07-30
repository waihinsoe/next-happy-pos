import MenuCard from "@/components/MenuCard";
import OrderLayout from "@/components/OrderLayout";
import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";
import { getMenusByMenuCategoryId } from "@/utils";
import {
  Box,
  Fab,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { menu_categories as MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const Order = () => {
  const router = useRouter();
  const query = router.query;
  const selectedLocationId = query.locationId as string;
  const { menuCategories, menus, menusMenuCategoriesLocations, cart } =
    useAppSelector(orderAppData);
  const cartItemCount = cart.length;
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();
  const tabValue =
    typeof window !== "undefined" && window.localStorage.getItem("tabValue");
  const [value, setValue] = useState(tabValue ? Number(tabValue) : 0);
  const [openPopUp, setOpenPopUp] = useState(false);

  typeof window !== "undefined" &&
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setOpenPopUp(true);
      } else {
        setOpenPopUp(false);
      }
    });
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
          px: 2,
        }}
      >
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
      setSelectedMenuCategory(menuCategories[value]);
    }
  }, [menuCategories]);

  if (!selectedMenuCategory) return null;
  return (
    <OrderLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            TabIndicatorProps={{
              style: { background: "#1B9C85" },
            }}
            sx={{
              ".Mui-selected": {
                color: "#1B9C85 !important",
                fontWeight: "bold",
              },
              px: 1,
            }}
            value={value}
            onChange={(evt, value) => {
              setValue(value);
              window.localStorage.setItem("tabValue", value);
            }}
            aria-label="menuCategories"
            variant="scrollable"
          >
            {menuCategories.length &&
              menuCategories.map((item) => {
                return (
                  <Tab
                    label={item.name}
                    key={item.id}
                    sx={{ color: "#4C4C6D" }}
                    onClick={() => setSelectedMenuCategory(item)}
                  />
                );
              })}
          </Tabs>
        </Box>
        {renderMenus()}

        {openPopUp && (
          <Fab
            color="success"
            size="large"
            onClick={() =>
              router.push({ pathname: "/order/cart", query: router.query })
            }
            sx={{
              position: "fixed",
              bottom: 10,
              right: 10,
            }}
          >
            <Box
              sx={{
                position: "relative",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <ShoppingCartCheckoutIcon sx={{ color: "#FFE194" }} />

              {cartItemCount > 0 && (
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    color: "#E8F6EF",
                  }}
                >
                  {cartItemCount}
                </Typography>
              )}
            </Box>
          </Fab>
        )}
      </Box>
    </OrderLayout>
  );
};

export default Order;
