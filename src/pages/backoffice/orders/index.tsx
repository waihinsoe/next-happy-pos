import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import {
  getOrdersByLocationIdAndTableId,
  getSelectedLocationId,
} from "@/utils";
import { Badge, Box } from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";

const OrderTables = () => {
  const { tables, orders } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const validTables = tables.filter(
    (table) => table.locations_id === Number(selectedLocationId)
  );

  return (
    <BackofficeLayout title="Orders">
      <Box>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {validTables.length > 0 &&
            validTables.map((table) => {
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
