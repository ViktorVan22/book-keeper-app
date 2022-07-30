import { get } from "@/utils";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import s from "./style.module.less";
import BillItemProps from "@/components/BillItem";

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
  const [pieType, setPieType] = useState<"expenditure" | "income">(
    "expenditure"
  ); // 饼图的「收入」和「支出」控制

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

  return <div>Data</div>;
};

export { Data };
