import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div>
      <NavigationBar/>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Layout;