import qs from "qs";
import { tokenStorage } from "../utils/index";
const request = {
  option: {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  },
  safeList: [
    "/store_list",
    "/store_remove",
    "/store",
    "/user_update",
    "/upload",
    "/user_info",
  ],
  get(url, config = {}) {
    let isSafe = this.safeList.some((v) => url.includes(v));
    if (isSafe) {
      let token = tokenStorage.get();
      if (token) {
        this.option.headers["authorization"] = token;
      } else {
        delete this.option.headers["authorization"];
      }
    }
    return fetch(url, {
      method: "GET",
      ...this.option,
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject({
        code: res.status,
        msg: res.statusText,
      });
    });
  },
  post(url, data) {
    let isSafe = this.safeList.some((v) => url.includes(v));
    if (isSafe) {
      let token = tokenStorage.get();
      if (token) {
        this.option.headers["authorization"] = token;
      }
    }
    return fetch(url, {
      method: "POST",
      ...this.option,
      body: qs.stringify(data),
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }

      return Promise.reject({
        code: res.status,
        msg: res.statusText,
      });
    });
  },
};

export default request;
