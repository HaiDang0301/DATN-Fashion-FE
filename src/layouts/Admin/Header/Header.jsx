import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
import logo from "../../../assets/logo.png";
import routesConfig from "../../../config/routes";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("full_name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("full_name");
    navigate(routesConfig.login);
  };
  return (
    <div className={cx("wrapper")}>
      <div className="row g-0">
        <div className="col-lg-2 col-md-2 col-sm-2 col-3">
          <div className={cx("logo")}>
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8 col-6">
          <div className={cx("right-menu")}>
            <div className={cx("mail")}>
              <Link to={"#"}>
                <i className="fa fa-envelope"></i>
              </Link>
            </div>
            <div className={cx("bell")}>
              <Link to={"#"}>
                <i className="fa fa-bell"></i>
              </Link>
            </div>
            <div className={cx("comment")}>
              <Link to={"#"}>
                <i className="fa fa-comment"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-3">
          <div className={cx("drop-down")}>
            <Dropdown className={cx("section-admin")}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Hi, admin
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  <Link to={routesConfig.Profile}>
                    <i className="fa fa-user"></i>
                    <span>Account</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={handleLogout}>
                  <i className="fa fa-power-off"></i>
                  <span>Log out</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
