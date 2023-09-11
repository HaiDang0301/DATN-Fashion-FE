import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
import { Link } from "react-router-dom";
import footerlogo from "../../../assets/footerlogo.png";
function Footer() {
  return (
    <footer className={cx("wrapper")}>
      Footer
    </footer>
  );
}
export default Footer;
