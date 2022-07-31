import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Toast } from "antd-mobile";

import s from "./style.module.less";
import UserProps from "../User";
import { get } from "@/utils";
import { post } from "../../utils/index";
import { Header } from "@/components/Header";
import ImageUploader, {
  ImageUploadItem,
} from "antd-mobile/es/components/image-uploader";
import "antd-mobile/es/global";

import { baseUrl, imgUrlTrans } from "@/utils/axios";
import axios from "@/utils/axios";

const UserInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>(); // 用户
  const [avatar, setAvatar] = useState<ImageUploadItem[] | string>(); // 头像
  const [signature, setSignature] = useState("");
  const [file, setFile] = useState<ImageUploadItem[]>();
  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await get("/api/user/get_userinfo");
    setUser(data);
    setAvatar(data.avatar);
  };

  //   const handleSelect

  const save = async () => {
    const { data } = await post("/api/user/edit_userinfo", {
      signature,
      avatar,
    });
    data
      ? Toast.show("保存成功")
      : Toast.show("保存失败，服务器可能出了小差，请稍后再试吧~");
    navigate(-1);
  };

  const beforeUpload = (file: File) => {
    if (file.size > 200 * 1024) {
      Toast.show("请选择小于 200KB 的图片");
      return null;
    }
    return file;
  };

  const uploadHandler = async (file: File) => {
    const url = URL.createObjectURL(file);
    console.log("url: ", url);

    let formData = new FormData();
    formData.append("file", file);
    const result = await axios({
      method: "post",
      url: `${baseUrl}/api/upload`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    console.log(console.log("result: ", result));
    setAvatar(imgUrlTrans(result.data));

    return { url };
  };

  return (
    <>
      <Header title="用户信息" />
      <div className={s.userinfo}>
        <h1>个人资料</h1>
        <div className={s.item}>
          <div className={s.title}>头像</div>
          <div className={s.avatar}>
            {/* 头像展示 */}
            <img className={s.avatarUrl} src={avatar as string} alt="" />
            <div className={s.desc}>
              <span>支持 jpg、png、jpeg 格式，大小 200KB 以内的图片</span>
              <ImageUploader
                value={file}
                onChange={setFile}
                upload={uploadHandler}
                beforeUpload={beforeUpload}
              >
                <Button color="primary">点击上传</Button>
              </ImageUploader>
            </div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.title}>个性签名</div>
          <div className={s.signature}>
            <Input
              clearable
              type="text"
              value={signature}
              placeholder="请输入个性签名，暂不支持emoji哦"
              onChange={value => setSignature(value)}
            />
          </div>
        </div>
        <Button onClick={save} style={{ marginTop: 50 }} block color="primary">
          保存
        </Button>
      </div>
    </>
  );
};

export { UserInfo };
