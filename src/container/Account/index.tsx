import { Button, Card, Input, Toast } from "antd-mobile";
import { useState } from "react";

import s from "./style.module.less";
import { Header } from "@/components/Header";
import UserProps from "../User";
import { get } from "@/utils";
import { post } from "../../utils/index";

const Account = () => {
  const [prevPwd, setPrevPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [user, setUser] = useState<UserProps>(); // 用户

  const submit = async () => {
    // 只需要把请求提交上去，验证环节交由后端处理
    const result = await post("/api/user/modify_pass", {
      old_pass: prevPwd,
      new_pass: newPwd,
      new_pass2: confirmPwd,
    });
    result
      ? Toast.show("修改成功")
      : Toast.show("修改失败，服务器出了会儿小差，请稍后再试...");
  };

  return (
    <>
      <Header title="重置密码" />
      <div className={s.account}>
        <div className={s.form}>
          <Card title={"原密码"}>
            <Input
              clearable
              type="text"
              placeholder="请输入原密码"
              value={prevPwd}
              onChange={value => setPrevPwd(value)}
            />
          </Card>
          <Card title={"新密码"}>
            <Input
              clearable
              type="text"
              placeholder="请输入新密码"
              value={newPwd}
              onChange={value => setNewPwd(value)}
            />
          </Card>
          <Card title={"确认密码"}>
            <Input
              clearable
              type="text"
              placeholder="请再次输入确认新密码"
              value={confirmPwd}
              onChange={value => setConfirmPwd(value)}
            />
          </Card>
        </div>
        <Button className={s.btn} block color="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </>
  );
};

export { Account };
