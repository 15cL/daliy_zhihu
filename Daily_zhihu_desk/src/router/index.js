import React, { Suspense, useEffect, useState } from "react";
import routes from "./routes";

import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
  Navigate,
} from "react-router-dom";
import actions from "../store/actions/index";
import { Mask, DotLoading, Toast } from "antd-mobile";

import style from "../asset/css/router/index.module.sass";
import { useStore } from "react-redux";
const isCheck = function (store, path) {
  let {
      base: { info },
    } = store.getState(),
    url = "/user";

  return !info && path.includes(url);
};

const Element = function (props) {
  const { component: Component, meta, path } = props,
    location = useLocation(),
    navigate = useNavigate(),
    [usp] = useSearchParams(),
    params = useParams();
  let store = useStore();
  // 登录校验
  let flag = isCheck(store, path);

  const [, setRandom] = useState(0);
  useEffect(() => {
    if (!isCheck(store, path)) return;
    (async () => {
      let res = await actions.base.queryUserInfoSync();
      if (!res.info) {
        Toast.show({
          icon: "fail",
          content: "请先登录",
        });
        navigate({ pathname: "/login", search: `?to=${path}` });
        return;
      }
      store.dispatch(res);
      setRandom(+new Date()); //确保每次状态更新都即使更新
    })();
  });

  const { title } = meta || {};
  document.title = title;

  return flag ? (
    <Mask visible={true}>
      <div style={{ color: "primary" }}>
        <DotLoading color="currentColor" className={style.overlayContent} />
      </div>
    </Mask>
  ) : (
    <Component
      location={location}
      navigate={navigate}
      usp={usp}
      params={params}
    />
  );
};

const CreateRoute = function (routes) {
  return (
    <>
      {routes.map((v, i) => {
        return (
          <Route key={i} path={v.path} element={<Element {...v} />}>
            {v.children ? CreateRoute(v.children) : null}
          </Route>
        );
      })}
    </>
  );
};

const AllRoutes = function () {
  return (
    <Suspense
      fallback={
        <Mask visible={true}>
          <div style={{ color: "primary" }}>
            <DotLoading color="currentColor" className={style.overlayContent} />
          </div>
        </Mask>
      }
    >
      <Routes>{CreateRoute(routes)}</Routes>
    </Suspense>
  );
};

export default AllRoutes;
