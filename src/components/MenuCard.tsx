import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import type { menus as Menu } from "@prisma/client";
interface Props {
  menu: Menu;
  href: string | object;
}

const MenuCard = ({ menu, href }: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card sx={{ Width: { xs: 150, md: 200 }, height: 220 }}>
        <CardMedia
          sx={{
            height: 130,
            width: { xs: 150, md: 200 },
            backgroundSize: "contain",
          }}
          image={menu.asset_url || ""}
          component={"img"}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {menu.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign={"center"}>
            {menu.price}{" "}
            {menu.price === 0 || menu.price === 1 ? "kyat" : "kyats"}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
