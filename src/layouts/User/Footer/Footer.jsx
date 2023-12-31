import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
import { Link } from "react-router-dom";
import footerlogo from "../../../assets/logo.png";
import AuthsAPI from "../../../api/AuthsAPI";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import routesConfig from "../../../config/routes";
function Footer() {
  const [email, setEmail] = useState();
  const [disabled, setDisable] = useState(false);
  const handleNewsletter = async () => {
    const data = { email: email };
    await AuthsAPI.newsletter(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Subscribe Newsletter Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setDisable(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Please check out your email", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setDisable(true);
        }
        if (err.response.status === 500) {
          toast.error("Connect Server Errors", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setDisable(true);
        }
      });
  };
  return (
    <footer className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("container-fluid")}>
        <div className={cx("ft")}>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className={cx("title")}>
                <h5>Theo dõi bản tin</h5>
                <p>Đăng ký bản tin để nhận 10% thanh toán.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-9 col-12">
              <div className={cx("input")}>
                <div className="row g-0">
                  <div className="col-lg-9 col-md-9 col-sm-9 col-8">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled={disabled}
                      placeholder="Nhập email của bản"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-3 col-md-3 col-sm-3 col-4">
                    <div className={cx("btn-resign")}>
                      <button
                        onClick={(e) => handleNewsletter()}
                        disabled={disabled}
                      >
                        Đăng Ký
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-12">
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
        <div className={cx("container-fluid")}>
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-2 col-2">
              <Link to={"/"}>
                <img src={footerlogo} alt="" />
              </Link>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <p>Thời Trang</p>
              <p>
                <i className="fa fa-phone"></i> 034 564 9255
              </p>
              <p>
                <i className="fa fa-envelope"></i> fashionlanhuong@gmail.com
              </p>
              <p>
                <i className="fa fa-map-marker"></i> Số 5 – Ngách 2 – Ngọc Đình
                – Hồng Dương – Thanh Oai – Hà Nội.
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className={cx("nav-item")}>
                <Link to={routesConfig.home}>Trang Chủ</Link>
                <Link to={routesConfig.Profile}>Tài Khoản</Link>
                <Link to={routesConfig.Products}>Bộ Sưu Tập</Link>
                <Link to={routesConfig.blogs}>Bài Viết</Link>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-2">
              <div className={cx("nav-item")}>
                <Link to={routesConfig.Contacts}>Liên Hệ</Link>
                <Link to={"#"}>Giúp Đỡ</Link>
                <Link to={"#"}>FAQ</Link>
                <Link to={"#"}>Về Chúng Tôi</Link>
                <Link to={"#"}>Chính Sách Giao Hàng</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("bottom-ft")}>
        <p>© 2023 | Website phục vụ học tập</p>
      </div>
    </footer>
  );
}
export default Footer;
