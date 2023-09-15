import { lazy } from "react";
import HomePage from "../views/HomePage";
import { withKeepAlive } from "keepalive-react-component";
const routes = [
  {
    path: "/",
    name: "home",
    component: withKeepAlive(HomePage, { cacheId: "HomePage", scroll: true }),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("../views/LoginPage/index")),
    meta: {
      title: "登录/注册",
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: lazy(() => import("../views/DetailPage/index.jsx")),
    meta: {
      title: "新闻详情",
    },
  },
  {
    path: "/user",
    name: "user",
    component: lazy(() => import("../views/UserPage/index")),
    meta: {
      title: "个人中心",
    },
    children: [
      {
        path: "/user/update",
        name: "update",
        component: lazy(() => import("../views/UserPage")),
        meta: {},
      },
    ],
  },
  {
    path: "/star",
    name: "star",
    component: lazy(() => import("../views/StarPage")),
    meta: {
      title: "我的收藏",
    },
  },
  {
    path: "*",
    name: "404",
    component: lazy(() => import("../views/Page404")),
    meta: {
      title: "404页面",
    },
  },
];

export default routes;
