import React, { useState } from "react";
import { Button } from "antd-mobile";

import s from "./style.module.less";
import { CalendarOutline, DownOutline } from "antd-mobile-icons";
import dayjs from "dayjs";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM"));

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}>
            总支出：<b>￥ 500</b>
          </span>
          <span className={s.income}>
            总收入：<b>￥ 2000</b>
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left}>
            <span className={s.title}>
              全部类型
              <DownOutline />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.time}>
              {currentTime}
              <CalendarOutline />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Home };
