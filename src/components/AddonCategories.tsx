import { Box, Typography, Chip, FormControl, RadioGroup } from "@mui/material";
import Addons from "./Addons";
import type {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
interface Props {
  validAddonCategories: AddonCategory[];
  addons: Addon[];
  selectedAddons: Addon[];
  handleAddonSelect: (value: boolean, addon: Addon) => void;
}

const AddonCategories = ({
  validAddonCategories,
  addons,
  selectedAddons,
  handleAddonSelect,
}: Props) => {
  return (
    <Box>
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
                    <Addons
                      addons={addons}
                      addonCategory={item}
                      selectedAddons={selectedAddons}
                      handleAddonSelect={handleAddonSelect}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            );
          })
        : ""}
    </Box>
  );
};

export default AddonCategories;
