import React, { useState } from "react";
import classNames from "classnames";
import { Form, Input, Checkbox, Button, Toast } from "antd-mobile";
import s from "./style.module.less";
import { UserOutline, LockOutline, CouponOutline } from "antd-mobile-icons";
import Captcha from "react-captcha-code";
import { useEffect } from "react";

const Login = () => {
  const [type, setType] = useState("login");
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = type === "register" ? "注册" : "登录";
  }, [type]);

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values);
    if (
      values.username === "" ||
      values.password === "" ||
      values.captcha === ""
    ) {
      Toast.show("请输入字段");
      return;
    }
    if (type === "register") {
      if (!checked) {
        Toast.show("请点击并同意用户使用条款");
        return;
      }
    }
  };
  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        <span
          className={classNames({ [s.active]: type === "login" })}
          onClick={() => setType("login")}
        >
          登录
        </span>
        <span
          className={classNames({ [s.active]: type === "register" })}
          onClick={() => setType("register")}
        >
          注册
        </span>
      </div>
      <div className={s.form}>
        <Form
          layout="horizontal"
          mode="card"
          form={form}
          initialValues={{
            username: "",
            password: "",
            captcha: "",
          }}
          footer={
            <>
              <div className={s.operation}>
                {type === "register" ? (
                  <div className={s.agree}>
                    <Checkbox
                      className={s.checkbox}
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-light">
                      阅读并同意<a>《用户使用条款》</a>
                    </label>
                  </div>
                ) : null}
              </div>
              <Button
                className={s.submitButton}
                color="primary"
                onClick={onSubmit}
              >
                {type === "register" ? "注册" : "登录"}
              </Button>
            </>
          }
        >
          <Form.Item label={<UserOutline />} name="username" required>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label={<LockOutline />} name="password" required>
            <Input placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label={<CouponOutline />}
            name="captcha"
            extra={<Captcha charNum={4} />}
            required
          >
            <Input placeholder="请输入验证码" clearable />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { Login };
