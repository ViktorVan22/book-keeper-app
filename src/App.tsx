import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { routes } from "@/router";
import { Nav } from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const needNav = ["/", "/data", "/user"];
  const [showNav, setShowNav] = useState(false);
  // 根据当前路径决定是否显示导航栏
  useEffect(() => {
    setShowNav(needNav.includes(pathname));
  }, [pathname]);

  return (
    <>
      <ConfigProvider locale={zhCN}>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </ConfigProvider>
      <Nav show={showNav} />
    </>
  );
}

export default App;
