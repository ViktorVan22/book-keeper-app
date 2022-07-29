import { Card } from "antd-mobile";
import { CustomIcon } from "../CustomIcon";
import s from "./style.module.less";
import dayjs from "dayjs";
import { get } from "@/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { typeMap } from "../../utils/index";

interface BillItemProps {
  id: number;
  pay_type: 1 | 2;
  amount: string;
  date: string;
  type_id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
  type_name: string;
  user_id: number;
  remark: string;
}

interface BillsProps {
  bills: {
    date: string;
    bills: BillItemProps[];
  };
}

const BillItem: React.FC<BillsProps> = ({ bills }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const navigate = useNavigate();

  return (
    <div className={s.item}>
      <div className={s.headerDate}>
        <div className={s.date}>{bills.date}</div>
        <div className={s.money}>
          <span>
            <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span>￥200</span>
          </span>
          <span>
            <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span>￥300</span>
          </span>
        </div>
      </div>
      {bills.bills.map(bill => (
        <Card
          key={bill.id.toString()}
          className={s.bill}
          title={
            <>
              <div>
                <CustomIcon
                  className={s.itemIcon}
                  type={
                    bill.type_id ? typeMap[bill.type_id].icon : typeMap[1].icon
                  }
                />
                <span>{bill.type_name}</span>
              </div>
              <span style={{ color: "#39be77" }}>{`${
                bill.pay_type === 1 ? "-" : "+"
              }${bill.amount}`}</span>
            </>
          }
        >
          <div>
            {dayjs(Number(bill.date)).format("HH:mm")}
            {bill.remark ? ` | ${bill.remark}` : ""}
          </div>
        </Card>
      ))}
    </div>
  );
};

export { BillItem };
