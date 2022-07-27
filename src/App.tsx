import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { routes } from "./router/index.jsx";
import "./App.css";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
