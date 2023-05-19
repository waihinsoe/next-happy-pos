import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import AddonCategories from "../components/AddonCategories";
import MenuCategories from "../components/MenuCategories";
import Menus from "../components/Menus";
import Addons from "../components/Addons";
import Settings from "../components/Settings";
import MenuDetail from "../components/MenuDetail.tsx";
import Register from "../components/Register.tsx";
import Login from "../components/Login.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Logout from "../components/Logout.tsx";
import MenuCategoryDetail from "../components/MenuCategoryDetail.tsx";
import Orders from "../components/Orders.tsx";
import CreateMenu from "../components/CreateMenu.tsx";
import Locations from "../components/Locations.tsx";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Layout>
//         <App />
//       </Layout>
//     ),
//   },
//   {
//     path: "/menus",
//     element: (
//       <Layout>
//         <Menus />
//       </Layout>
//     ),
//   },
//   {
//     path: "/menus/:menuId",
//     element: (
//       <Layout>
//         <MenuDetail />
//       </Layout>
//     ),
//   },
//   {
//     path: "/menu-categories",
//     element: (
//       <Layout>
//         <MenuCategories />
//       </Layout>
//     ),
//   },
//   {
//     path: "/addons",
//     element: (
//       <Layout>
//         <Addons />
//       </Layout>
//     ),
//   },
//   {
//     path: "/addon-categories",
//     element: (
//       <Layout>
//         <AddonCategories />
//       </Layout>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <Layout>
//         <Login />
//       </Layout>
//     ),
//   },
//   {
//     path: "/register",
//     element: (
//       <Layout>
//         <Register />
//       </Layout>
//     ),
//   },
//   {
//     path: "/settings",
//     element: (
//       <Layout>
//         <Settings />
//       </Layout>
//     ),
//   },
// ]);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/orders" Component={Orders} />

          <Route path="/menus" Component={Menus} />
          <Route path="/menus/create" Component={CreateMenu} />
          <Route path="/menus/:menuId" Component={MenuDetail} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route
            path="/menu-categories/:menuCategoryId"
            Component={MenuCategoryDetail}
          />
          <Route path="/addons" Component={Addons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/locations" Component={Locations} />
          <Route path="/settings" Component={Settings} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/logout" Component={Logout} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
