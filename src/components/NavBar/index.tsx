import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabBar } from "antd-mobile";
import {
  PayCircleOutline,
  PieOutline,
  UserSetOutline,
} from "antd-mobile-icons";
import classNames from "classnames";

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

interface Props {
  show: boolean;
}

const Nav: React.FC<Props> = ({ show }) => {
  const [active, setActive] = useState("/");
  const navigate = useNavigate();

  const changeTab = (path: string): void => {
    setActive(path);
    navigate(path);
  };
  return show ? (
    <TabBar className={s.tab} onChange={changeTab}>
      {tabs.map(tab => (
        <TabBar.Item key={tab.route} icon={tab.icon} title={tab.title} />
      ))}
    </TabBar>
  ) : null;
};

export { Nav };
