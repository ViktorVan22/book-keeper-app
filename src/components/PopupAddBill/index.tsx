import { useEffect, forwardRef, MutableRefObject } from "react";

import { useRef, useState } from "react";
import { Popup } from "antd-mobile";

import { get } from "@/utils";
import s from "./style.module.less";
import BillItemProps from "../BillItem";

interface Props {
  detail: BillItemProps;
  onReload: () => void;
}

const PopupAddBill = forwardRef(({ detail, onReload }: Props, ref) => {
  const dateRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getTypeList();
  }, []);
  const getTypeList = async () => {
    const {
      data: { list },
    } = await get("/api/type/list");
    console.log(list);
    // const _expenditure = list.filter((i: 1|2) => i.type === 1);
  };

  //   if (ref) {
  //     ref.current = {
  //       show: () => {
  //         setShow(true);
  //       },
  //       close: () => {
  //         setShow(false);
  //       },
  //     };
  //   }

  return <Popup>添加账单</Popup>;
});

export { PopupAddBill };
