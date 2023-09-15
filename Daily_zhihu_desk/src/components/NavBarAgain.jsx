import { NavBar } from "antd-mobile";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const NavBaraAgain = function (props) {
  let navigate = useNavigate();
  const { title } = props;
  const handleBack = () => {
    navigate(-1);
    return;
  };
  return <NavBar onBack={handleBack}>{title}</NavBar>;
};

NavBaraAgain.defaultProps = {
  title: "个人中心",
};

NavBaraAgain.propTypes = {
  title: propTypes.string,
};

export default NavBaraAgain;
