import React from "react";
import { Button } from "antd-mobile";

import s from "./style.module.less";

const Home = () => {
  return (
    <div className={s.index}>
      首页
      <span>样式</span>
      <hr />
      <Button block color="primary" size="large">
        Block Button
      </Button>
    </div>
  );
};

export { Home };
