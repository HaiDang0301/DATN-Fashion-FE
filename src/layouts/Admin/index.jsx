import Header from "./Header/Header";
import classNames from "classnames/bind";
import styles from "./Layout.module.scss";
import SideBar from "./SideBar/SideBar";
const cx = classNames.bind(styles);
function LayoutAdmin({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className="row g-0">
        <div className="col-lg-12">
          <div className={cx("header")}>
            <Header></Header>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row g-0">
            <div className="col-lg-2 col-md-2 col-sm-12">
              <div className={cx("side-bar")}>
                <SideBar></SideBar>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-12">
              <div className={cx("children")}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
