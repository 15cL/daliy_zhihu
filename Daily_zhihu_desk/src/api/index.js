import http from "./http";

// 获取今日新闻信息 & 轮播图信息
export const queryNewsLatest = async () => {
  return await http.get("/api//news_latest");
};

// 获取以往新闻,前一天的
export const queryNewsBefore = (time) => {
  return http.get(`/api/news_before?time=${time}`);
};

// 获取新闻详情
export const queryNewsInfo = (id) => {
  return http.get(`/api/news_info?id=${id}`);
};

// 获取新闻点赞信息
export const queryStoryExtra = (id) => {
  return http.get(`/api/story_extra?id=${id}`);
};

// 登录
export const login = (data) => {
  return http.post("/api/login", data);
};

// 获取短信验证码
export const queryPhoneCode = (data) => {
  return http.post("/api/phone_code", data);
};

// 获取用户信息
export const queryUserInfo = () => {
  return http.get("/api/user_info");
};

// 上传图片
export const upload = (data) => {
  return http.post("/upload", data);
};

// 修改用户信息
export const updateUserInfo = (data) => {
  return http.post("/user_update", data);
};

// 收藏新闻

export const addStore = (data) => {
  return http.post("/api/store", data);
};

// 移除收藏

export const removeStore = (id) => {
  return http.get(`/api/store_remove?id=${id}`);
};

// 获取收藏列表
export const getStoreList = () => {
  return http.get("/api/store_list");
};
