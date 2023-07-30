import QuantitySelector from "@/components/QuantitySelector";
import { generateRandomId, getAddonCategoriesByMenuId } from "@/utils";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Typography } from "@mui/material";
import type { addons as Addon } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AddonCategories from "@/components/AddonCategories";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { orderAppData, setCartItem } from "@/store/slices/orderAppSlice";
import OrderLayout from "@/components/OrderLayout";

const MenuDetail = () => {
  const { menusAddonCategories, addonCategories, menus, addons } =
    useAppSelector(orderAppData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query;
  const menuId = query.id as string;
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const validMenu = menus.find((item) => item.id === Number(menuId));
  const validAddonCategories = getAddonCategoriesByMenuId(
    menusAddonCategories,
    menuId,
    addonCategories
  );

  const addToCart = () => {
    dispatch(
      setCartItem({
        id: generateRandomId(),
        menu: validMenu,
        addons: selectedAddons,
        quantity,
      })
    );

    router.push({ pathname: "/order", query });
  };

  const handleAddonSelect = (selected: boolean, addon: Addon) => {
    if (selected) {
      const addonCategory_of_current_addon = validAddonCategories.find(
        (item) => item.id === addon.addon_categories_id
      );

      if (
        addonCategory_of_current_addon &&
        addonCategory_of_current_addon.is_required
      ) {
        const addonToRemove = selectedAddons.find(
          (item) =>
            item.addon_categories_id === addonCategory_of_current_addon.id
        );

        let newSelectedAddons: Addon[] = [];
        if (addonToRemove) {
          newSelectedAddons = selectedAddons.filter(
            (item) => item.id !== addonToRemove.id
          );
        } else {
          newSelectedAddons = selectedAddons;
        }

        setSelectedAddons([...newSelectedAddons, addon]);
      } else {
        setSelectedAddons([...selectedAddons, addon]);
      }
    } else {
      setSelectedAddons([
        ...selectedAddons.filter((item) => item.id !== addon.id),
      ]);
    }
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.is_required
    );

    if (requiredAddonCategories.length) {
      if (!selectedAddons.length) {
        setIsDisabled(true);
      } else {
        const requiredAddons = selectedAddons.filter((addon) => {
          return requiredAddonCategories.find(
            (item) => item.id === addon.addon_categories_id
          );
        });
        const hasSelectedAllRequiredAddons =
          requiredAddonCategories.length === requiredAddons.length;
        if (hasSelectedAllRequiredAddons) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      }
    } else {
      setIsDisabled(false);
    }
  }, [selectedAddons, validAddonCategories]);

  return (
    <OrderLayout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            px: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", md: "500px" },
            position: "relative",
            zIndex: 10,
            top: -90,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
              {validMenu?.name}
            </Typography>
            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
              {validMenu?.price} kyats
            </Typography>
          </Box>

          <AddonCategories
            validAddonCategories={validAddonCategories}
            addons={addons}
            selectedAddons={selectedAddons}
            handleAddonSelect={handleAddonSelect}
          />
          <QuantitySelector
            value={quantity}
            onIncrease={handleQuantityIncrease}
            onDecrease={handleQuantityDecrease}
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", margin: "0 auto", mt: 2 }}
            disabled={isDisabled}
            onClick={addToCart}
            startIcon={<AddShoppingCartIcon />}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </OrderLayout>
  );
};

export default MenuDetail;
