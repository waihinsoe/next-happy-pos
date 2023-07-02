import QuantitySelector from "@/components/QuantitySelector";
import { OrderContext } from "@/contexts/OrderContext";
import { getAddonCategoriesByMenuId } from "@/utils";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Typography } from "@mui/material";
import type { addons as Addon } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import AddonCategories from "@/components/AddonCategories";

const MenuDetail = () => {
  const {
    menusAddonCategories,
    addonCategories,
    menus,
    addons,
    updateData,
    cart,
  } = useContext(OrderContext);
  const { ...data } = useContext(OrderContext);
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

  const updateOrderLine = cart.find((item) => item.menu.id === Number(menuId));

  useEffect(() => {
    if (updateOrderLine) {
      const alreadySelectedAddons = updateOrderLine.addons;
      setSelectedAddons(alreadySelectedAddons);
      setQuantity(updateOrderLine.quantity);
    }
  }, [updateOrderLine]);

  const addToCart = () => {
    updateData({
      ...data,
      cart: [
        ...data.cart,
        { menu: validMenu, addons: selectedAddons, quantity },
      ],
    });

    router.push({ pathname: "/order", query });
  };

  const updateCart = () => {
    if (updateOrderLine) {
      const otherCartItems = cart.filter(
        (item) => item.menu.id !== Number(menuId)
      );

      const newCartItems = [
        ...otherCartItems,
        { menu: updateOrderLine.menu, addons: selectedAddons, quantity },
      ];

      updateData({ ...data, cart: newCartItems });
      router.push({ pathname: "/order/cart", query });
    }
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
          {validMenu?.name}
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
          onClick={updateOrderLine ? updateCart : addToCart}
          startIcon={<AddShoppingCartIcon />}
        >
          {updateOrderLine ? "update" : "Add to cart"}
        </Button>
      </Box>
    </Box>
  );
};

export default MenuDetail;
