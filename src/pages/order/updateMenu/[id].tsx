import AddonCategories from "@/components/AddonCategories";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import QuantitySelector from "@/components/QuantitySelector";
import { OrderContext } from "@/contexts/OrderContext";
import type { addons as Addon } from "@prisma/client";
import { getAddonCategoriesByMenuId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { orderAppData, updateCartItem } from "@/store/slices/orderAppSlice";

const UpdateMenu = () => {
  const router = useRouter();
  const query = router.query;
  const cartItemId = query.id as string;
  const { cart, menus, addonCategories, menusAddonCategories, addons } =
    useAppSelector(orderAppData);
  const dispatch = useAppDispatch();
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const cartItem = cart.find((item) => item.id === cartItemId);
  const validAddonCategories = cartItem
    ? getAddonCategoriesByMenuId(
        menusAddonCategories,
        String(cartItem.menu.id),
        addonCategories
      )
    : [];
  const handleUpdateCart = () => {
    if (!cartItem) return;
    dispatch(
      updateCartItem({
        id: cartItemId,
        menu: cartItem.menu,
        addons: selectedAddons,
        quantity,
      })
    );
    router.push({ pathname: "/order/cart", query });
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

  useEffect(() => {
    if (cartItem) {
      const alreadySelectedAddons = cartItem.addons;
      setSelectedAddons(alreadySelectedAddons);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", md: "500px" },
        }}
      >
        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
          {cartItem?.menu?.name}
        </Typography>

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
          onClick={handleUpdateCart}
          startIcon={<AddShoppingCartIcon />}
        >
          update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateMenu;
