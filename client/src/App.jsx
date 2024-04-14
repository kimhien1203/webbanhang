import UserContext from "./Context/provider";
import Layout from "./Layout/Layout";

export default function App() {
  return (
    <UserContext>
      <Layout />
    </UserContext>
  );
}