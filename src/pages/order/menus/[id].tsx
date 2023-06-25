import { OrderContext } from "@/contexts/OrderContext";
import type {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
import { getAddonCategoriesByMenuId } from "@/utils";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const MenuDetail = () => {
  const { menusAddonCategories, addonCategories, menus, addons } =
    useContext(OrderContext);
  const router = useRouter();
  const query = router.query;
  const menuId = query.id as string;
  const validMenu = menus.find((item) => item.id === Number(menuId));
  const validAddonCategories = getAddonCategoriesByMenuId(
    menusAddonCategories,
    menuId,
    addonCategories
  );
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const renderAddons = (addonCategory: AddonCategory) => {
    const validAddons = addons.filter(
      (item) => item.addon_categories_id === addonCategory.id
    );
    return validAddons.map((addon) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        key={addon.id}
      >
        <FormControlLabel
          value={addon.name}
          control={
            addonCategory.is_required ? (
              <Radio
                onChange={(evt, value) => handleAddonSelect(value, addon)}
              />
            ) : (
              <Checkbox
                onChange={(evt, value) => handleAddonSelect(value, addon)}
              />
            )
          }
          label={addon.name}
        />
        <Typography>
          {addon.price} {addon.price ? "kyats" : "kyat"}
        </Typography>
      </Box>
    ));
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

  useEffect(() => {
    console.log("selectedAddons :", selectedAddons);
  }, [selectedAddons]);

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
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
      }}
    >
      <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
        {validMenu?.name}
      </Typography>

      {validAddonCategories.length
        ? validAddonCategories.map((item) => {
            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {item.name}
                  </Typography>
                  <Chip label={item.is_required ? "required" : "optional"} />
                </Box>
                <FormControl sx={{ px: 2 }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {renderAddons(item)}
                  </RadioGroup>
                </FormControl>
              </Box>
            );
          })
        : ""}
      <Button
        variant="contained"
        sx={{ width: "fit-content", margin: "0 auto", mt: 2 }}
        disabled={isDisabled}
      >
        Add to card
      </Button>
    </Box>
  );
};

export default MenuDetail;
