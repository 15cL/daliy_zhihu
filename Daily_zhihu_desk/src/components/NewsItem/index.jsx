import { Image } from "antd-mobile";
import "./index.scss";
import { useNavigate } from "react-router-dom";
const NewsItem = function (props) {
  const { images, image, id, title, hint } = props.item;
  const navigate = useNavigate();
  return (
    <div
      className="news_item"
      onClick={() => {
        navigate(`/detail/${id}`);
      }}
    >
      <div className="left">
        <h2>{title}</h2>
        <p>{hint}</p>
      </div>
      <div className="right">
        <Image src={images || image} lazy />
      </div>
    </div>
  );
};

export default NewsItem;
