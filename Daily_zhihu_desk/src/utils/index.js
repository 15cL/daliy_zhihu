export const formDateTime = (time) => {
  let year = time.getFullYear();
  let month = time.getMonth();
  if (month < 10) {
    month = "0" + month;
  }
  let day = time.getDate();
  return `${year}${month}${day}`;
};

// 获取月份
export const getMonth = (index) => {
  const area = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  return area[index];
};

export function getDate(time1, time2) {
  let year1 = time1.slice(0, 4);
  let year2 = time2.slice(0, 4);
  let time =
    +year1 - +year2 > -1 && +year1 - +year2 < 1 ? time1.slice(4) : time1;
  if (time.length > 4) {
    return `${time.slice(0, 4)}年${+time.slice(4, 6) + 1}月${+time.slice(6)}日`;
  }
  return `${+time.slice(0, 2) + 1}月${+time.slice(2)}日`;
}
// 储存token
export let tokenStorage = {
  set(token) {
    localStorage.setItem("token", JSON.stringify({ token, date: new Date() }));
  },
  get(cycle = 259200000) {
    let res = localStorage.getItem("token");
    res = JSON.parse(res);
    cycle = isNaN(cycle) ? 259000000 : +cycle;
    if (new Date() - res?.date > cycle) {
      tokenStorage.remove("token");
      return null;
    }
    return res?.token;
  },
  remove() {
    localStorage.removeItem("token");
  },
};
