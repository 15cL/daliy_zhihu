import { Skeleton } from "antd-mobile";
import "./index.sass";
const SkeletonAgain = function (params) {
  return (
    <div className="skeleton_again">
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
};

export default SkeletonAgain;
