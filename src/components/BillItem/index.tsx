import { Card } from "antd-mobile";
import { CustomIcon } from "../CustomIcon";
import s from "./style.module.less";
import dayjs from "dayjs";
import { get } from "@/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { typeMap } from "../../utils/index";

export default interface BillItemProps {
  id?: number;
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
  const [expenditure, setExpenditure] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const _income = bills.bills
      .filter(i => i.pay_type === 2)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    setIncome(_income);
    const _expense = bills.bills
      .filter(i => i.pay_type === 1)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    setExpenditure(_expense);
  }, [bills.bills]);

  const goToDetailPage = (item: BillItemProps) => {
    navigate(`/detail?id=${item.id}`);
  };

  return (
    <div className={s.item}>
      <div className={s.headerDate}>
        <div className={s.date}>{bills.date}</div>
        <div className={s.money}>
          <span>
            <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span>￥{expenditure}</span>
          </span>
          <span>
            <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span>￥{income}</span>
          </span>
        </div>
      </div>
      {bills.bills.map(bill => (
        <Card
          key={bill.id!.toString()}
          className={s.bill}
          onClick={() => goToDetailPage(bill)}
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
              <span
                style={{ color: bill.pay_type === 2 ? "red" : "#39be77" }}
              >{`${bill.pay_type === 1 ? "-" : "+"}${bill.amount}`}</span>
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
