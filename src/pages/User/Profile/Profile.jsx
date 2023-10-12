import className from "classnames/bind";
import styles from "./Profile.module.scss";
const cx = className.bind(styles);
function Profile() {
  document.title = "Profile";
  return <div className={cx("wrapper")}></div>;
}

export default Profile;
