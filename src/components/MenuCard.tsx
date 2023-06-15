import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import type { menus as Menu } from "@prisma/client";
interface Props {
  menu: Menu;
}

const MenuCard = ({ menu }: Props) => {
  return (
    <Link
      href={`/backoffice/menus/${menu.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card sx={{ Width: 200, height: 200 }}>
        <CardMedia
          sx={{ height: 100, width: 200 }}
          image={`${menu.asset_url}`}
          component={"img"}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {menu.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {menu.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
