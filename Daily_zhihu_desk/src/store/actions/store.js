import { addStore, getStoreList, removeStore } from "../../api/index";
import * as types from "../ACTION_TYPES";

const storeAction = {
  async queryStarList() {
    let res;
    try {
      res = await getStoreList();
    } catch (error) {}
    return {
      type: types.STAR_LIST,
      list: res.data,
    };
  },

  // 添加收藏
  async addStar(newsId) {
    try {
      await addStore({ newsId });
    } catch (error) {}
    return {
      type: types.STAR_ADD,
    }
  },

  // 移除收藏
  async removeStar(id) {
    try {
      await removeStore(id);
    } catch (error) {}
    return {
      type: types.STAR_DEL,
      id,
    };
  },
};

export default storeAction;
