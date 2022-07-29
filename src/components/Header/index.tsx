import { NavBar } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";

import s from "./style.module.less";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <div className={s.headerWrap}>
      <div className={s.block}>
        <NavBar onBack={back}>{title}</NavBar>
      </div>
    </div>
  );
};

export { Header };
