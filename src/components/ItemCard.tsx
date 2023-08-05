import { Paper, Box, Typography } from "@mui/material";
import Link from "next/link";
import type { addon_categories as AddonCategory } from "@prisma/client";
import { ReactNode } from "react";
interface Props {
  href?: string;
  title: string;
  icon: ReactNode;
  subtitle?: string;
}

const ItemCard = ({ subtitle, href, title, icon }: Props) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "black  " }}>
        <Paper elevation={2}>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              p: 1,
            }}
          >
            {icon}
            <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography sx={{ color: "#4C4C6D", fontSize: 14, mt: 2 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Paper>
      </Link>
    );
  }

  return (
    <Paper elevation={2}>
      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          cursor: "pointer",
          p: 1,
        }}
      >
        <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
          {title}
        </Typography>
        <Typography sx={{ color: "#4C4C6D", fontSize: 14 }}>
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ItemCard;
