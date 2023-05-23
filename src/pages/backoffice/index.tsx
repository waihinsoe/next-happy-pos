import { useContext } from "react";
import Layout from "../../components/Layout";
import { AppContext } from "@/contexts/AppContext";

function App() {
  const { locations } = useContext(AppContext);
  console.log(locations);
  return (
    <Layout>
      <h1>Home page</h1>
    </Layout>
  );
}

export default App;
