import { get } from "@/utils";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import s from "./style.module.less";
import BillItemProps from "@/components/BillItem";
import { CalendarOutline } from "antd-mobile-icons";
import classNames from "classnames";
import { CustomIcon } from "@/components/CustomIcon";
import { typeMap } from "../../utils/index";
import { DatePicker, ProgressBar } from "antd-mobile";

let proportionChart = null;

interface TotalDataProps {
  type_id: BillItemProps["type_id"];
  type_name: string;
  pay_type: 1 | 2;
  number: number;
}

const Data = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [totalType, setTotalType] = useState<"expenditure" | "income">(
    "expenditure"
  );
  const [totalExpenditure, setTotalExpenditure] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入
  const [expenditureData, setExpenditureData] = useState([]); // 支出数据
  const [incomeData, setIncomeData] = useState([]); // 收入数据
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getData();
  }, [currentMonth]);
  const getData = async () => {
    const { data } = await get(`/api/bill/data?date=${currentMonth}`);
    setTotalExpenditure(data.total_expense);
    setTotalIncome(data.total_income);

    // 过滤支出和收入
    const expense_data = data.total_data
      .filter((item: TotalDataProps) => item.pay_type == 1)
      .sort((a: TotalDataProps, b: TotalDataProps) => b.number - a.number); // 过滤出账单类型为支出的项
    const income_data = data.total_data
      .filter((item: TotalDataProps) => item.pay_type == 2)
      .sort((a: TotalDataProps, b: TotalDataProps) => b.number - a.number); // 过滤出账单类型为收入的项
    setExpenditureData(expense_data);
    setIncomeData(income_data);
  };

  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time} onClick={() => setShowDatePicker(true)}>
          <span>{currentMonth}</span>
          <CalendarOutline />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>￥{totalExpenditure}</div>
        <div className={s.income}>共收入¥{totalIncome}</div>
      </div>
      <div className={s.structure}>
        <div className={s.head}>
          <span className={s.title}>收支构成</span>
          <div className={s.tab}>
            <span
              onClick={() => setTotalType("expenditure")}
              className={classNames({
                [s.expense]: true,
                [s.active]: totalType == "expenditure",
              })}
            >
              支出
            </span>
            <span
              onClick={() => setTotalType("income")}
              className={classNames({
                [s.income]: true,
                [s.active]: totalType == "income",
              })}
            >
              收入
            </span>
          </div>
        </div>
        <div className={s.content}>
          {(totalType === "expenditure" ? expenditureData : incomeData).map(
            (item: TotalDataProps) => (
              <div key={item.type_id} className={s.item}>
                <div className={s.left}>
                  <div className={s.type}>
                    <span
                      className={classNames({
                        [s.expense]: totalType === "expenditure",
                        [s.income]: totalType === "income",
                      })}
                    >
                      <CustomIcon
                        type={
                          item.type_id ? typeMap[item.type_id].icon : "canyin"
                        }
                      />
                    </span>
                    <span className={s.name}>{item.type_name}</span>
                  </div>
                  <div className={s.progress}>￥{item.number.toFixed(2)}</div>
                </div>
                <div className={s.right}>
                  <div className={s.percent}>
                    <ProgressBar
                      text
                      percent={
                        Math.floor(
                          (item.number /
                            (totalType == "expenditure"
                              ? totalExpenditure
                              : totalIncome)) *
                            10000
                        ) / 100
                      }
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <DatePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onConfirm={val => setCurrentMonth(dayjs(val).format("YYYY-MM"))}
        precision="month"
      />
    </div>
  );
};

export { Data };
