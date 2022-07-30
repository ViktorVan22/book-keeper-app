import { useState, useEffect } from "react";
import { Popup } from "antd-mobile";
import classNames from "classnames";
import { CloseOutline } from "antd-mobile-icons";

import s from "./style.module.less";
import { get } from "@/utils";
import BillItemProps from "../BillItem";

export default interface TypeProps {
  id: BillItemProps["type_id"];
  name: string;
  type: 1 | 2;
  user_id?: number;
}

interface Props {
  visible: boolean;
  onMaskClick: () => void;
  onSelect?: (item: "all" | BillItemProps["type_id"]) => void;
}

const PopupType = ({ visible, onMaskClick, onSelect }: Props) => {
  const [active, setActive] = useState<"all" | BillItemProps["type_id"]>("all");
  const [expenditure, setExpenditure] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    getTypeList();
  }, []);
  // console.log("expenditure", expenditure);

  const getTypeList = async () => {
    const {
      data: { list },
    } = await get("/api/type/list");
    if (list) {
      setExpenditure(list.filter((i: TypeProps) => i.type === 1));
      setIncome(list.filter((i: TypeProps) => i.type === 2));
    }
  };

  const chooseTypeId = (id: "all" | BillItemProps["type_id"]) => {
    setActive(id);
    onSelect && onSelect(id);
    onMaskClick();
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={onMaskClick}
      bodyStyle={{
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
      }}
    >
      <div className={s.popupType}>
        <div className={s.header}>
          请选择类型
          <CloseOutline className="s.cross" onClick={onMaskClick} />
        </div>
        <div className={s.content}>
          <div
            onClick={() => chooseTypeId("all")}
            className={classNames({
              [s.all]: true,
              [s.active]: active === "all",
            })}
          >
            全部类型
          </div>
          <div className={s.title}>支出</div>
          <div className={s.expenseWrap}>
            {expenditure.map((item: TypeProps, index) => (
              <p
                key={index}
                onClick={() => {
                  chooseTypeId(item.id);
                }}
                className={classNames({ [s.active]: active === item.id })}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className={s.title}>收入</div>
          <div className={s.incomeWrap}>
            {income.map((item: TypeProps, index) => (
              <p
                key={index}
                onClick={() => chooseTypeId(item.id)}
                className={classNames({ [s.active]: active == item.id })}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export { PopupType };
