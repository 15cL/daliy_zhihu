import { queryUserInfo } from "../../api/index";
import * as types from "../ACTION_TYPES";
const baseAction = {
  
  // 获取登录者信息
  async queryUserInfoSync() {
    let info;
    try {
      let { code, data } = await queryUserInfo();
      if (+code === 0) {
        info = data;
      }
    } catch (error) {}
    return {
      type: types.USER_INFO,
      info,
    };
  },

  // 删除存储的登录者信息
  removeUserInfo() {
    return {
      type: types.USER_INFO,
      info: null,
    };
  },
};

export default baseAction;
