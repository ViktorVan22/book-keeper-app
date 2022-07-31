import React, { HTMLAttributes, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TabBar } from "antd-mobile";
import {
  PayCircleOutline,
  PieOutline,
  UserSetOutline,
} from "antd-mobile-icons";

import s from "./style.module.less";

const tabs = [
  {
    key: "账单",
    route: "/",
    title: "账单",
    icon: <PayCircleOutline />,
  },
  {
    key: "统计",
    route: "/data",
    title: "统计",
    icon: <PieOutline />,
  },
  {
    key: "我的",
    route: "/user",
    title: "我的",
    icon: <UserSetOutline />,
  },
];

interface NavProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
}

const Nav: React.FC<NavProps> = ({ show }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const changeTab = (path: string): void => {
    navigate(path);
  };

  return show ? (
    <TabBar className={s.tab} onChange={changeTab} activeKey={pathname}>
      {tabs.map(tab => (
        <TabBar.Item key={tab.route} icon={tab.icon} title={tab.title} />
      ))}
    </TabBar>
  ) : null;
};

export { Nav };
