import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import {
  LeftOutline,
  MessageOutline,
  LikeOutline,
  StarOutline,
  SendOutline,
  StarFill,
} from "antd-mobile-icons";
import { Badge, Toast } from "antd-mobile";

import { queryNewsInfo, queryStoryExtra } from "../../api/index";
import SkeletonAgain from "../../components/SkeletonAgain/index";

import actions from "../../store/actions";

import "./index.sass";

const Detail = function (props) {
  const [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null),
    [isStar, setIsStar] = useState(false);
  let { params, navigate, base, queryUserInfoSync } = props;
  let link;

  // 在富文本html中添加富文本CSS
  const handleCSS = (res) => {
    if (!res.css[0]) {
      return;
    }
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = res.css[0];
    document.head.appendChild(link);
  };

  // 在富文本html中添加图片节点
  const handleImage = (res) => {
    if (!res) {
      return;
    }

    let title = document.querySelector(".question-title");
    title.innerText = res.title;

    let ImageBox = document.querySelector(".img-place-holder");
    if (!ImageBox) {
      return;
    }
    let tempImg = document.createElement("img");
    tempImg.src = res.image;
    tempImg.onload = () => {
      ImageBox.appendChild(tempImg);
    };
    tempImg.onerror = () => {
      let parent = ImageBox.parentNode;
      parent.parentNode.removeChild(parent);
    };
  };

  let {
    queryStarList,
    addStar,
    removeStar,
    store: { list },
  } = props;

  useEffect(() => {
    (async () => {
      let res = await queryNewsInfo(params.id);
      flushSync(() => {
        setInfo(res);
        handleCSS(res);
      });

      handleImage(res);

      // 是否登录
      if (!base.info) {
        await queryUserInfoSync();
      }
      // 是否收藏
      let ress = await queryStarList();
      setIsStar(ress.list.some((v) => +v.news.id === +res.id));
    })();
    return () => {
      // 销毁组件  移除link
      if (link) {
        document.head.removeChild(link);
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      let res = await queryStoryExtra(params.id);
      setExtra(res);
    })();
  }, []);

  // 点击收藏
  const handleCollect = () => {
    if (!base.info) {
      Toast.show({
        icon: "fail",
        content: "请登录",
      });
      navigate("/login");
    }
    if (isStar) {
      let index = list.findIndex((v) => +v.news.id === +info.id);
      const id = list[index].id;
      removeStar(id);
      Toast.show({
        icon: "success",
        content: "移除收藏成功",
      });
      setIsStar(false);
    } else {
      addStar(info.id);
      Toast.show({
        icon: "success",
        content: "收藏成功",
      });
      setIsStar(true);
    }
  };

  return (
    <div className="detail_page">
      {info ? (
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: info?.body }}
        ></div>
      ) : (
        <SkeletonAgain />
      )}

      <div className="botn"></div>
      <div className="bottom_bar" style={{ fontSize: "50px" }}>
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge content={extra?.comments} color="#eee">
            <MessageOutline />
          </Badge>
          <Badge content={extra?.popularity} color="#eee">
            <LikeOutline />
          </Badge>
          <div onClick={handleCollect}>
            {!isStar ? <StarOutline /> : <StarFill />}
          </div>
          <div>
            <SendOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => {
    return {
      base: state.base,
      store: state.store,
    };
  },
  { ...actions.base, ...actions.store }
)(Detail);
