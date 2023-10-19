import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
import { Link } from "react-router-dom";
import footerlogo from "../../../assets/logo.png";
function Footer() {
  return (
    <footer className={cx("wrapper")}>
      <div className={cx("footer-top")}>
        <div className={cx("ft")}>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className={cx("title")}>
                <h5>Subscribe Newsletter</h5>
                <p>Subscribe newsletter to get 5% on all products.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className={cx("input")}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
                <div className={cx("btn-resign")}>
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-6 col-12">
              <div className={cx("social-network")}>
                <a
                  href="https://www.facebook.com/profile.php?id=100023095460530"
                  target="blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="/">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="/">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="/">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="/">
                  <i className="fa fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("inner-footer")}>
        <div className={cx("main")}>
          <div className={cx("logo")}>
            <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={"/"}>
                  <img src={footerlogo} alt="" />
                </Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <div className={cx("nav-ite")}>
                  <Link to={"/"}>Men</Link>
                  <Link to={"/"}>Clothing Fashion</Link>
                  <Link to={"/"}>Winter</Link>
                  <Link to={"/"}>Summer</Link>
                  <Link to={"/"}>Collection 2023</Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <div className={cx("nav-ite")}>
                  <Link to={"/"}>Men</Link>
                  <Link to={"/"}>Clothing Fashion</Link>
                  <Link to={"/"}>Winter</Link>
                  <Link to={"/"}>Summer</Link>
                  <Link to={"/"}>Collection 2023</Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <div className={cx("nav-ite")}>
                  <Link to={"/"}>Men</Link>
                  <Link to={"/"}>Clothing Fashion</Link>
                  <Link to={"/"}>Winter</Link>
                  <Link to={"/"}>Summer</Link>
                  <Link to={"/"}>Collection 2023</Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <div className={cx("nav-ite")}>
                  <Link to={"/"}>Men</Link>
                  <Link to={"/"}>Clothing Fashion</Link>
                  <Link to={"/"}>Winter</Link>
                  <Link to={"/"}>Summer</Link>
                  <Link to={"/"}>Collection 2023</Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <div className={cx("nav-item")}>
                  <Link to={"/"}>Contact</Link>
                  <Link to={"/"}>Support</Link>
                  <Link to={"/"}>FAQ</Link>
                  <Link to={"/"}>About</Link>
                  <Link to={"/"}>Delivery</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("bottom-ft")}>
        <p>
          Đồ án tốt nghiệp © 2023 | Website phục vụ học tập không nhằm mục đích
          kinh doanh
        </p>
      </div>
    </footer>
  );
}
export default Footer;
