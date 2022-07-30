import { useEffect, forwardRef, MutableRefObject } from "react";
import { CloseOutline, DownOutline } from "antd-mobile-icons";
import { useRef, useState } from "react";
import {
  Popup,
  NumberKeyboard,
  DatePicker,
  Input,
  TextArea,
  Toast,
} from "antd-mobile";

import { get } from "@/utils";
import s from "./style.module.less";
import BillItemProps from "../BillItem";
import classNames from "classnames";
import TypeProps from "../PopupType";
import dayjs from "dayjs";
import { CustomIcon } from "@/components/CustomIcon";
import { typeMap, post } from "../../utils/index";

interface Props {
  visible: boolean;
  onMaskClick: () => void; // 关闭弹窗：点击遮罩或者其他关闭功能共用该函数
  onReload?: () => void; // 刷新回调
}

const PopupAddBill = ({ visible, onMaskClick, onReload }: Props) => {
  const [expenditure, setExpenditure] = useState([]);
  const [income, setIncome] = useState([]);
  const [payType, setPayType] = useState<"expenditure" | "income">(
    "expenditure"
  );
  const [bill, setBill] = useState<BillItemProps>();
  const [date, setDate] = useState(new Date());
  const [currentType, setCurrentType] = useState<TypeProps>();
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState("0");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true); // 控制数字键盘显示
  const [showRemark, setShowRemark] = useState(false);

  useEffect(() => {
    getTypeList();
  }, []);

  const getTypeList = async () => {
    const {
      data: { list },
    } = await get("/api/type/list");
    const _expenditure = list.filter((i: TypeProps) => i.type === 1);
    setExpenditure(_expenditure);
    setIncome(list.filter((i: TypeProps) => i.type === 2));
    setCurrentType(_expenditure[0]);
  };

  const changeType = (type: "expenditure" | "income") => {
    setPayType(type);
  };

  const keyboardActions = {
    onInput: (value: string) => {
      // 保证只有一个小数点
      if (value === "." && amount.includes(".")) {
        return;
      }
      // 小数点后保留两位
      if (amount.includes(".") && amount.split(".")[1].length >= 2) {
        return;
      }
      amount === "0" ? setAmount(value) : setAmount(amount + value);
    },
    onConfirm: () => {
      addBill();
    },
    onDelete: () => {
      if (amount !== "0" && amount.length === 1) {
        setAmount("0");
      } else {
        setAmount(amount.slice(0, amount.length - 1));
      }
    },
  };

  const addBill = async () => {
    if (amount === "0") {
      Toast.show("请输入具体金额");
      return;
    }
    const params = {
      amount: Number(amount).toFixed(2),
      type_id: currentType?.id,
      type_name: currentType?.name,
      date: dayjs(date).unix() * 1000,
      pay_type: payType === "expenditure" ? 1 : 2,
      remark: remark,
    };

    const result = await post("/api/bill/add", params);
    setAmount("0");
    setPayType("expenditure");
    setCurrentType(expenditure[0]);
    setDate(new Date());
    setRemark("");
    setTimeout(() => {
      result
        ? Toast.show("添加成功")
        : Toast.show("添加失败，服务端可能出了点小差，请稍后再试");
    });

    onMaskClick();
    onReload && onReload();
  };

  return (
    <Popup visible={visible} onMaskClick={onMaskClick}>
      <div className={s.addWrap}>
        <header className={s.header}>
          <span className={s.close} onClick={onMaskClick}>
            <CloseOutline />
          </span>
        </header>
        <div className={s.filter}>
          <div className={s.type}>
            <span
              onClick={() => changeType("expenditure")}
              className={classNames({
                [s.expense]: true,
                [s.active]: payType === "expenditure",
              })}
            >
              支出
            </span>
            <span
              onClick={() => {
                changeType("income");
              }}
              className={classNames({
                [s.income]: true,
                [s.active]: payType === "income",
              })}
            >
              收入
            </span>
          </div>
          <div onClick={() => setShowDatePicker(true)} className={s.time}>
            {dayjs(date).format("YYYY-MM-DD")}
            <DownOutline />
          </div>
        </div>
        <div className={s.money}>
          <span className={s.suffix}>￥</span>
          <span
            onClick={() => setShowKeyboard(true)}
            className={classNames(s.amount, s.animation)}
          >
            {amount}
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.typeBody}>
            {(payType === "expenditure" ? expenditure : income).map(
              (item: TypeProps) => (
                <div
                  onClick={() => {
                    setCurrentType(item);
                  }}
                  key={item.id}
                  className={s.typeItem}
                >
                  <span
                    className={classNames({
                      [s.iconfontWrap]: true,
                      [s.expense]: payType === "expenditure",
                      [s.income]: payType === "income",
                      [s.active]: currentType?.id === item.id,
                    })}
                  >
                    <CustomIcon
                      classID={s.iconfont}
                      type={typeMap[item.id].icon}
                    />
                  </span>
                  <span className={s.itemName}>{item.name}</span>
                </div>
              )
            )}
          </div>
        </div>
        <div className={s.remark}>
          {showRemark ? (
            <div className={s.inputWrapper}>
              <TextArea
                className={s.input}
                maxLength={50}
                showCount={true}
                placeholder="请输入备注信息"
                style={{ "--font-size": "16px" }}
                rows={3}
                onChange={val => setRemark(val)}
                value={remark}
              />
            </div>
          ) : (
            <span onClick={() => setShowRemark(true)}>
              {bill?.remark || "添加备注"}
            </span>
          )}
        </div>
        <div className={classNames(s.keyboard, { [s.active]: showKeyboard })}>
          <NumberKeyboard
            visible={showKeyboard}
            getContainer={null}
            showCloseButton={false}
            customKey="."
            confirmText="确定"
            onInput={keyboardActions.onInput}
            onDelete={keyboardActions.onDelete}
            onConfirm={keyboardActions.onConfirm}
          />
        </div>
        <DatePicker
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onConfirm={val => setDate(val)}
          precision="minute"
        />
      </div>
    </Popup>
  );
};

export { PopupAddBill };
