import React, { useEffect } from "react";
import { useStore } from "react-redux";
import NavBar from "../../components/NavBarAgain";
import "./index.scss";
import { connect } from "react-redux";
import actions from "../../store/actions/index";
import { Toast } from "antd-mobile";
import { tokenStorage } from "../../utils";
const User = function (props) {
  const { removeUserInfo, navigate } = props;
  let store = useStore();
  const {
    base: { info },
  } = store.getState();

  useEffect(() => {
    return async () => {
      let res = await actions.base.queryUserInfoSync();
      return store.dispatch(res);
    };
  }, []);

  return (
    <div className="user_page">
      <NavBar />
      <div className="user">
        <img src={info?.pic} alt="" />
        <div className="username">{info?.name}</div>
      </div>
      <div
        className="star btn"
        onClick={() => {
          navigate("/star");
        }}
      >
        我的收藏
      </div>
      <div
        className="out btn"
        onClick={() => {
          removeUserInfo();
          tokenStorage.remove();
          Toast.show({
            icon: "success",
            content: "退出登录成功",
          });
          navigate("/login", { replace: true });
        }}
      >
        退出登录
      </div>
    </div>
  );
};

export default connect(null, actions.base)(User);
