import { useState, useEffect } from "react";
import { DatePicker, DotLoading, InfiniteScroll } from "antd-mobile";
import { CalendarOutline, DownOutline } from "antd-mobile-icons";
import dayjs from "dayjs";

import s from "./style.module.less";

import BillItemProps, { BillItem } from "@/components/BillItem";
import { get } from "@/utils";
import { CustomIcon } from "@/components/CustomIcon";
import { PopupAddBill } from "@/components/PopupAddBill";
import { PopupType } from "@/components/PopupType";
import { typeMap } from "../../utils/index";

interface TypeProps {
  icon: string;
  name: string;
}

const Home = () => {
  const [billList, setBillList] = useState([]); // 帐单列表
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [currentSelect, setCurrentSelect] = useState<TypeProps | undefined>(); // 当前选择类型
  const [page, setPage] = useState(1); // 当前分页
  const [totalPage, setTotalPage] = useState(0); // 分页总数
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [hasMore, setHasMore] = useState(true); // 判断是否有更多数据需要加载
  const [showTypeList, setShowTypeList] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getBillList(); // 初始化账单页面
  }, [page, currentMonth, currentSelect]);
  console.log("totalPage: ", totalPage);

  const loadMore = async () => {
    setPage(page + 1);
    setHasMore(page < totalPage);
  };

  const getBillList = async () => {
    // 因为loadMore是异步函数，所以page会额外再加1，则会造成额外的无用 get 请求
    // 所以要限制无效请求
    if (totalPage && page > totalPage) {
      return;
    }
    const { data } = await get(
      `/api/bill/list?page=${page}&page_size=5&date=${currentMonth}&type_id=${
        currentSelect || "all"
      }`
    );
    if (page === 1) {
      setBillList(data.list);
    } else {
      setBillList(billList.concat(data.list));
    }
    setTotalPage(data.totalPage);
    setTotalExpenditure(data.totalExpense.toFixed(2));
    setTotalIncome(data.totalIncome.toFixed(2));
  };

  const toggleTypeList = () => {
    setShowTypeList(true);
  };

  const selectType = (id: "all" | BillItemProps["type_id"]) => {
    setPage(1);
    id === "all" ? setCurrentSelect(undefined) : setCurrentSelect(typeMap[id]);
  };

  const toggleBillPage = () => {
    setShowAddBill(true);
  };

  // 添加或编辑账单后触发刷新
  const reloadPage = () => {
    getBillList();
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const selectMonth = (month: Date) => {
    setPage(1);
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}>
            总支出：<b>￥ {totalExpenditure}</b>
          </span>
          <span className={s.income}>
            总收入：<b>￥ {totalIncome}</b>
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left}>
            <span className={s.title} onClick={toggleTypeList}>
              {currentSelect ? currentSelect.name : "全部类型"}
              <DownOutline />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.time} onClick={toggleDatePicker}>
              {currentMonth}
              <CalendarOutline />
            </span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {billList.length ? (
          billList.map((bill, index) => <BillItem bills={bill} key={index} />)
        ) : (
          <div>
            当月没有任何账单
            <hr />
            快记上一笔吧~(●'◡'●)
          </div>
        )}
        {billList.length ? (
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={50}>
            {hasMore ? (
              <div>
                <span>正在努力加载中</span>
                <DotLoading />
              </div>
            ) : (
              <span>--- 没有更多记录啦 ---</span>
            )}
          </InfiniteScroll>
        ) : null}
      </div>
      <div className={s.add} onClick={toggleBillPage}>
        <CustomIcon type="tianjia" />
      </div>
      <PopupType
        visible={showTypeList}
        onMaskClick={() => setShowTypeList(false)}
        onSelect={item => selectType(item)}
      />
      <PopupAddBill
        visible={showAddBill}
        onMaskClick={() => setShowAddBill(false)}
        onReload={reloadPage}
      />
      <DatePicker
        precision={"month"}
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onConfirm={val => selectMonth(val)}
      />
    </div>
  );
};

export { Home };
