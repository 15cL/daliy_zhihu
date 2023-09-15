import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//国际化
import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

import { Provider } from "react-redux";
import store from "../src/store/index";

//引入flexible
import "../src/asset/lib-flexible/lib-flexible";
import "../src/asset/css/index/index.sass";

// import sass from "./index.module.sass";
// 由于postcss-pxtorem不解析js中css代码,所以styled方法舍弃  换成导入外部css样式
/*
import styled from "styled-components";

const MaxBox = styled.div`
  margin: 0 auto;
  max-width: 750px;
  div {
   
  }
`;
*/

// 处理最大宽度
(function () {
  const computed = () => {
    let html = document.documentElement,
      device_width = html.clientWidth,
      maxWith = 750;
    document.getElementById("root").style.maxWidth = "750px";
    if (device_width > maxWith) {
      html.style.fontSize = "75px";
    }
  };
  computed();
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ConfigProvider locale={enUS}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

