import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import classNames from "classnames/bind";
import styles from "./Layout.module.scss";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Header></Header>
      </div>
      <div className={cx("children")}>{children}</div>
      <div className={cx("footer")}>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default DefaultLayout;
