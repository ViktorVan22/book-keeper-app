import { get } from "@/utils";
import { Button, Card } from "antd-mobile";
import {
  KeyOutline,
  RightOutline,
  TeamOutline,
  UserSetOutline,
} from "antd-mobile-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import s from "./style.module.less";
import { CustomIcon } from "@/components/CustomIcon";

export default interface UserProps {
  id: number;
  username: string;
  signature: string;
  avatar: string;
  createdAt: string;
  password: string;
}

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>(); // 用户
  const [avatar, setAvatar] = useState(""); // 头像
  const [signature, setSignature] = useState("");
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await get("/api/user/get_userinfo");
    setUser(data);
    setAvatar(data.avatar);
    setSignature(data.signature);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：{user?.username || "--"}</span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: "-10px" }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
            <b>{user?.signature || "暂无个签"}</b>
          </span>
        </div>
        <img
          className={s.avatar}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          src={user?.avatar || ""}
          alt=""
        />
      </div>
      <div className={s.content}>
        <Card
          title={
            <div style={{ fontWeight: "normal" }}>
              <UserSetOutline style={{ marginRight: "8px" }} fontSize={24} />
              用户信息修改
            </div>
          }
          extra={<RightOutline />}
          onClick={() => navigate("/userinfo")}
        />
        <Card
          title={
            <div style={{ fontWeight: "normal" }}>
              <KeyOutline
                style={{ marginRight: "8px" }}
                fontSize={24}
                color="var(--adm-color-primary)"
              />
              重置密码
            </div>
          }
          extra={<RightOutline />}
          onClick={() => navigate("/account")}
        />
        <Card
          title={
            <div style={{ fontWeight: "normal" }}>
              <TeamOutline
                style={{ marginRight: "8px" }}
                fontSize={24}
                color="#76c6b8"
              />
              关于我们
            </div>
          }
          extra={<RightOutline />}
          onClick={() => navigate("/about")}
        />
      </div>
      <Button className={s.logout} block color="danger" onClick={logout}>
        退出登录
      </Button>
    </div>
  );
};

export { User };
