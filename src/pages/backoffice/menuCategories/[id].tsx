import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Box, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

const EditMenuCategory = () => {
  const router = useRouter();
  const menuCategoryId = router.query.id as string;
  const { menuCategories } = useContext(BackOfficeContext);

  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );

  return (
    <Layout>
      <Box>
        <TextField defaultValue={menuCategory?.name} />
      </Box>
    </Layout>
  );
};

export default EditMenuCategory;
