import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
function Home() {
  document.title = "Home";
  return (
    <div className={cx("wrapper")}>
      <h5>Home</h5>
    </div>
  );
}
export default Home;
