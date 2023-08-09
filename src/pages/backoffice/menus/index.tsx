import BackofficeLayout from "@/components/BackofficeLayout";
import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId, searching, sorting } from "@/utils";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import NewMenu from "./NewMenu";
import { menus as Menu } from "@prisma/client";
import SortingAndSearching from "@/components/SortingAndSearching";

const Menus = () => {
  const [open, setOpen] = useState(false);
  const [sortStatus, setSortStatus] = useState<string>("id");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { menus, menusMenuCategoriesLocations } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => {
      return item.locations_id === Number(selectedLocationId);
    })
    .map((menusLocation) => menusLocation.menus_id);

  const filteredMenus = menus.filter(
    (menu) => menu.id && validMenuIds.includes(menu.id)
  );
  const sortedMenus = sorting(filteredMenus, sortStatus);

  const searchedMenus = searching(sortedMenus, searchKeyword);
  return (
    <BackofficeLayout title="Menus">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <SortingAndSearching
          sortStatus={sortStatus}
          changeSortStatus={setSortStatus}
          searchKeyword={searchKeyword}
          changeSearchKeyword={setSearchKeyword}
        />
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#4C4C6D",
            color: "#E8F6EF",
            width: "fit-content",
            ":hover": {
              bgcolor: "#1B9C85", // theme.palette.primary.main
              color: "white",
            },
          }}
        >
          NewMenu
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {searchedMenus.length > 0 &&
          searchedMenus.map((menu: Menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              href={`/backoffice/menus/${menu.id}`}
            />
          ))}
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </BackofficeLayout>
  );
};

export default Menus;
