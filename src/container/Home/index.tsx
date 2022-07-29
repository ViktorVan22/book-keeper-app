import React, { useState } from "react";
import { Button } from "antd-mobile";

import s from "./style.module.less";
import { CalendarOutline, DownOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import { CustomIcon } from "@/components/CustomIcon";
import { BillItem } from "@/components/BillItem";
import { get } from "@/utils";
import { useEffect } from "react";

interface TypeMap {
  [id: string]: { [icon: string]: string };
}

const Home = () => {
  const [billList, setBillList] = useState([]); // 帐单列表
  const [currentSelect, setCurrentSelect] = useState<TypeMap>({}); // 当前选择类型
  const [page, setPage] = useState(1); // 分页
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM"));

  useEffect(() => {
    getBillList(); // 初始化账单页面
  }, []);
  console.log(billList);
  const getBillList = async () => {
    const { data } = await get(
      `/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${
        currentSelect.id || "all"
      }`
    );
    setBillList(data.list);
  };
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
      <div className={s.contentWrap}>
        {billList.length ? (
          billList.map((bill, index) => <BillItem bills={bill} key={index} />)
        ) : (
          <div>无法获取账单数据</div>
        )}
      </div>
    </div>
  );
};

export { Home };
