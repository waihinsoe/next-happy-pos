import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import type {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
interface Props {
  addons: Addon[];
  addonCategory: AddonCategory;
  selectedAddons: Addon[];
  handleAddonSelect: (value: boolean, addon: Addon) => void;
}
const Addons = ({
  addons,
  addonCategory,
  selectedAddons,
  handleAddonSelect,
}: Props) => {
  const validAddons = addons.filter(
    (item) => item.addon_categories_id === addonCategory.id
  );
  return (
    <Box>
      {validAddons.map((addon) => (
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
                  checked={
                    selectedAddons.find((item) => item.id === addon.id)
                      ? true
                      : false
                  }
                  onChange={(evt, value) => handleAddonSelect(value, addon)}
                />
              ) : (
                <Checkbox
                  checked={
                    selectedAddons.find((item) => item.id === addon.id)
                      ? true
                      : false
                  }
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
      ))}
    </Box>
  );
};

export default Addons;
