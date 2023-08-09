import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import {
  getOrdersByLocationIdAndTableId,
  getSelectedLocationId,
  searching,
  sorting,
} from "@/utils";
import { tables as Table } from "@prisma/client";
import { Badge, Box } from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";
import SortingAndSearching from "@/components/SortingAndSearching";
import { useState } from "react";

const OrderTables = () => {
  const [sortStatus, setSortStatus] = useState<string>("id");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { tables, orders } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const validTables = tables.filter(
    (table) => table.locations_id === Number(selectedLocationId)
  );
  const sortedTables = sorting(validTables, sortStatus);
  const searchedTables = searching(sortedTables, searchKeyword);
  return (
    <BackofficeLayout title="Orders">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <SortingAndSearching
            sortStatus={sortStatus}
            changeSortStatus={setSortStatus}
            searchKeyword={searchKeyword}
            changeSearchKeyword={setSearchKeyword}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {searchedTables.length > 0 &&
            searchedTables.map((table: Table) => {
              const currentTableOrders = getOrdersByLocationIdAndTableId(
                orders,
                selectedLocationId,
                String(table.id)
              );
              return (
                <Badge
                  key={table.id}
                  badgeContent={currentTableOrders.length}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      width: 35,
                      height: 35,
                      fontSize: 18,
                      borderRadius: "50%",
                    },
                  }}
                >
                  <ItemCard
                    icon={
                      <TableBarIcon
                        sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }}
                      />
                    }
                    href={`/backoffice/orders/${table.id}`}
                    title={table.name}
                    subtitle={`${currentTableOrders.length} orders`}
                  />
                </Badge>
              );
            })}
        </Box>
      </Box>
    </BackofficeLayout>
  );
};

export default OrderTables;
