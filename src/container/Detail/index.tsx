import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import queryString from "query-string";
import classNames from "classnames";
import dayjs from "dayjs";
import { Modal, Toast } from "antd-mobile";
import { ExclamationCircleFill } from "antd-mobile-icons";

import s from "./style.module.less";
import { Header } from "@/components/Header";
import BillItemProps from "@/components/BillItem";
import { get, post, typeMap } from "@/utils";
import { CustomIcon } from "@/components/CustomIcon";

const Detail = () => {
  const location = useLocation();
  const { id } = queryString.parse(location.search);
  const [detail, setDetail] = useState<BillItemProps>();
  const navigate = useNavigate();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const { data } = await get(`/api/bill/detail?id=${id}`);
    setDetail(data);
  };

  const deleteDetail = () => {
    Modal.confirm({
      header: (
        <ExclamationCircleFill
          style={{
            fontSize: 64,
            color: "var(--adm-color-warning)",
          }}
        />
      ),
      title: "注意",
      content: (
        <>
          <div>确认删除帐单？</div>
        </>
      ),
      onConfirm: async () => {
        const { data } = await post("/api/bill/delete", { id });
        setTimeout(() => {
          Toast.show("删除成功");
          navigate(-1);
        }, 1000);
      },
    });
  };

  return (
    <div className={s.detail}>
      <Header title="账单详情" />
      <div className={s.card}>
        <div className={s.type}>
          <span
            className={classNames({
              [s.expense]: detail?.pay_type === 1,
              [s.income]: detail?.pay_type === 2,
            })}
          >
            <CustomIcon
              className={s.iconfont}
              type={
                detail?.type_id ? typeMap[detail.type_id].icon : typeMap[1].icon
              }
            />
          </span>
          <span>{detail?.type_name || ""}</span>
        </div>
        {detail?.pay_type === 1 ? (
          <div className={classNames(s.amount, s.expense)}>
            -{detail.amount}
          </div>
        ) : (
          <div className={classNames(s.amount, s.income)}>
            +{detail?.amount}
          </div>
        )}
        <div className={s.info}>
          <div className={s.time}>
            <span>记录时间</span>
            <span>
              {dayjs(Number(detail?.date)).format("YYYY-MM-DD HH:MM")}
            </span>
          </div>
          <div className={s.remark}>
            <span>备注</span>
            <span>{detail?.remark || "-"}</span>
          </div>
        </div>
        <div className={s.operation}>
          <span className={s.operator} onClick={deleteDetail}>
            <CustomIcon type="shanchu" />
            删除
          </span>
          <span className={s.operator}>
            <CustomIcon type="tianjia" />
            编辑
          </span>
        </div>
      </div>
    </div>
  );
};

export { Detail };
