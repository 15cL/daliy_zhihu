import { useEffect, useRef, useState } from "react";
import HomeHead from "../../components/HomeHead/index";
import { formDateTime, getDate } from "../../utils/index";
import { Swiper, Image, DotLoading, Divider } from "antd-mobile";
import { queryNewsLatest, queryNewsBefore } from "../../api/index";
import { NavLink } from "react-router-dom";
import SkeletonAgain from "../../components/SkeletonAgain/index";
import NewsItem from "../../components/NewsItem/index";
import "./index.sass";

const Home = function (props) {
  const { navigate } = props;

  const [time] = useState(formDateTime(new Date())),
    [banner, setBanner] = useState(),
    [list, setList] = useState([]);

  const loading_more = useRef();

  useEffect(() => {
    (async () => {
      const data = await queryNewsLatest();
      let { date, stories } = data;
      setBanner(data.top_stories);
      list.push({ date, stories });
      setList([...list]);
    })();
  }, []);

  useEffect(() => {
    let bc = new IntersectionObserver(async (changes) => {
      const { isIntersecting } = changes[0];
      if (isIntersecting) {
        let time = +list[list.length - 1]["date"];
        const data = await queryNewsBefore(time);
        let { date, stories } = data;
        list.push({ date, stories });
        setList([...list]);
      }
    });
    bc.observe(loading_more.current);
    let loadmore = loading_more.current;
    return () => {
      bc.unobserve(loadmore);
      bc = null;
    };
  }, []);

  return (
    <div className="home_page">
      {/* 头部导航 */}
      <HomeHead time={time} navigate={navigate}></HomeHead>

      {/* 轮播图 */}
      <div className="swiper">
        <Swiper
          autoplay
          loop
          indicatorProps={{
            color: "white",
          }}
        >
          {banner?.map((v) => {
            return (
              <Swiper.Item key={v.id}>
                <NavLink to={{ pathname: `/detail/${v.id}` }}>
                  <Image src={v.image} lazy />
                  <div className="title">
                    <h3>{v.title}</h3>
                    <p>{v.hint}</p>
                  </div>
                </NavLink>
              </Swiper.Item>
            );
          })}
        </Swiper>
      </div>

      {/* <SkeletonAgain /> */}
      {list ? (
        <div className="news_items">
          {list.map((m) => {
            return (
              <div className="all" key={m.date}>
                <Divider contentPosition="left">
                  {getDate(m.date, time)}
                </Divider>
                {m.stories.map((v) => {
                  return <NewsItem item={v} key={v.id} />;
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <SkeletonAgain />
      )}

      <div
        className="loading_more"
        ref={loading_more}
        style={{ display: list.length > 0 ? "block" : "none" }}
      >
        <DotLoading />
        数据加载中
      </div>
    </div>
  );
};

export default Home;
