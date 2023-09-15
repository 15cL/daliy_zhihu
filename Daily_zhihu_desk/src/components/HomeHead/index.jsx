import { useEffect, useMemo, useState } from "react";
import imgl from "../../asset/pic/111958WfxoI.jpg";
import "./index.sass";
import { getMonth } from "../../utils/index";

import actions from "../../store/actions/index";
import { useStore } from "react-redux";

const HomeHead = function (props) {
  const { time, navigate } = props;
  const date = time.match(/^\d{4}(\d{2})(\d{2})$/);
  const store = useStore();
  const [, setDate] = useState(0);
  let {
    base: { info },
  } = store.getState();

  useEffect(() => {
    if (!info) {
      let res = actions.base.queryUserInfoSync();
      store.dispatch(res);
      setDate(+new Date());
    }
  }, []);

  const today = useMemo(() => {
    let day = date[2],
      month = getMonth(+date[1]);
    return {
      day,
      month,
    };
  }, [date]);
  return (
    <div className="home_head">
      <div className="left">
        <div className="time_box">
          <span>{today.day}</span>
          <span>{today.month}</span>
        </div>

        <h2 className="title">知乎日报</h2>
      </div>
      <div
        className="pic"
        onClick={() => {
          navigate("/user");
        }}
      >
        <img src={info ? info.pic : imgl} alt="" />
      </div>
    </div>
  );
};

export default HomeHead;
