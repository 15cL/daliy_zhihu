import React, { useEffect, useState } from "react";
import { NavBar, Form, Input, Button, Toast } from "antd-mobile";
import { connect } from "react-redux";
import actions from "../../store/actions/index";
import { queryPhoneCode, login } from "../../api/index";
import "./index.scss";
import { tokenStorage } from "../../utils/index";

const Login = function (props) {
  const { navigate, queryUserInfoSync, usp, location } = props;

  const [form] = Form.useForm();

  const [isCode, setIsCode] = useState(false);
  let [num, setNum] = useState(60);

  // 检验手机号
  const validatePhone = (a, b) => {
    if (!b) {
      return Promise.reject(new Error("手机号不能为空!"));
    }
    let flag = /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(b);
    if (!flag) {
      return Promise.reject(new Error("手机号格式错误!"));
    }
    return Promise.resolve();
  };
  // 校验验证码
  const validateCode = (a, b) => {
    if (!b) {
      return Promise.reject(new Error("验证码不能为空！"));
    }

    if (b.length !== 6 || !/^\d{6}$/.test(b)) {
      return Promise.reject(new Error("验证码格式错误！"));
    }
    return Promise.resolve();
  };

  // 获取手机验证码
  const queryPhoneC = async () => {
    const phone = form.getFieldValue("tel");
    let res = await queryPhoneCode({ phone });
    if (res.code) {
      Toast.show({
        icon: "success",
        content: `验证码已发送,${res.verificationCode}`,
      });
      setIsCode(true);
    }
  };

  //登录
  const loginC = async () => {
    let { tel, valNum } = form.getFieldsValue();
    let res = await login({ phone: tel, code: valNum });
    if (res.code) {
      Toast.show({
        icon: "fail",
        content: `登录失败`,
      });
      return form.resetFields();
    }
    tokenStorage.set(res.token);
    console.log(tokenStorage.get());
    await queryUserInfoSync();
    Toast.show({
      icon: "success",
      content: `登录成功`,
    });
    // 判断是跳转下一链接，还是返回上衣链接
    let to = usp.get("to");
    to ? navigate(to, { replace: true }) : navigate(-1);
    return form.resetFields();
  };

  // toggleCodeBtn
  useEffect(() => {
    if (isCode) {
      let time = setInterval(() => {
        setNum((num) => --num);
        if (num === 0) {
          clearInterval(time);
          setIsCode(false);
          setNum(60);
        }
      }, 1000);
    }
  }, [isCode]);

  return (
    <div className="login_page">
      <NavBar
        onBack={() => {
          if (location.search.includes("/user")) {
            return navigate(-2);
          }
          navigate(-1);
        }}
      >
        注册/登录
      </NavBar>
      <div className="main">
        <Form
          form={form}
          initialValues={{
            tel: "",
            valNum: "",
          }}
          layout="horizontal"
          mode="card"
          style={{ "--border-top": "none" }}
        >
          <Form.Item
            label="手机号"
            name="tel"
            validateTrigger="onBlur"
            rules={[{ validator: validatePhone }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="valNum"
            label="短信验证码"
            extra={
              <Button size="small" color="primary" onClick={queryPhoneC}>
                {isCode ? num : "发送验证码"}
              </Button>
            }
            validateTrigger="onBlur"
            rules={[{ validator: validateCode }]}
          >
            <Input placeholder="请输入短信验证码" />
          </Form.Item>
        </Form>
        <div className="btn">
          <Button type="submit" onClick={loginC} color="primary" size="large">
            提交
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, actions.base)(Login);
