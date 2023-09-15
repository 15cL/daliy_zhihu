import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem/index";
import { connect, useStore } from "react-redux";
import action from "../store/actions";
import NavBaraAgain from "../components/NavBarAgain";
const Star = function (props) {
  const store = useStore();
  const {
    store: { list },
  } = store.getState();
  const { queryStarList } = props;
  const [, setDate] = useState(0);

  useEffect(() => {
    (async () => {
      if (!list.length) {
        let res = await queryStarList();
        console.log(res);
        store.dispatch(res);
        setDate(+new Date());
      }
    })();
  }, []);

  return (
    <div className="star_page">
      <NavBaraAgain title='我的收藏'/>
      {list.map((v) => {
        return <NewsItem item={v.news} key={v.id}></NewsItem>;
      })}
    </div>
  );
};

export default connect(null, action.store)(Star);
