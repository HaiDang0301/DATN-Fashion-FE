import React, { useEffect, useState } from "react";
import routesConfig from "../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function Header() {
  const navigate = useNavigate();
  const full_name = localStorage.getItem("full_name");
  const [show, setShow] = useState(false);
  const [showchildren, setShowchildren] = useState(false);
  const [user, setUser] = useState();
  const handleShow = () => setShow(!show);
  const handleChildren = () => setShowchildren(!showchildren);
  useEffect(() => {
    if (full_name) {
      setUser(full_name);
    } else {
      setUser(sessionStorage.getItem("full_name"));
    }
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("full_name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("full_name");
    setTimeout(() => {
      navigate(routesConfig.login);
    }, 100);
  };
  return (
    <header className={cx("header-setion")}>
      <div className={cx("header-top")}>
        <div className={cx("container g-0")}>
          <div className="row g-0">
            <div className="col-lg-3 col-md-4 col-sm-5 col-4">
              <div className={cx("hd-left")}>
                <i className="fa fa-envelope"> dinhhaidang1003@gmail.com</i>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-4 col-4">
              <div className={cx("phone")}>
                <i className="fa fa-phone">+84 345 649 255</i>
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
            <div className="col-lg-2 col-md-2 col-sm-3 col-4">
              <div className={cx("auth")}>
                {user ? (
                  <div className={cx("user")}>
                    <ul>
                      <li className={cx("drop")}>
                        Hi {user}
                        <Link to={"#"}>
                          <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className={cx("menu-user")}>
                          <li>
                            <Link to={"#"}>
                              <i className="fa fa-user"> Profile</i>
                            </Link>
                          </li>
                          <li>
                            <Link to={"#"} onClick={handleLogout}>
                              <i className="fa fa-sign-out"> Logout</i>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className={cx("login")}>
                    <i className="fa fa-user"></i>
                    <Link to={routesConfig.login}>Login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("nav-item")}>
        <div className="container">
          <div className={cx("menu-wrapper")}>
            <div className={cx("logo")}>
              <Link to={routesConfig.home}>
                <img src="https://preview.colorlib.com/theme/fashi/img/logo.png.webp"></img>
              </Link>
            </div>
            <div className={cx("item")}>
              <Link to={routesConfig.home}>Home</Link>
            </div>
            <div className={cx("item")}>
              <ul>
                <li className={cx("collections")}>
                  <Link to={"#"}>
                    Collections <i className="fa fa-caret-down"></i>
                  </Link>

                  <ul className={cx("category")}>
                    <li>
                      <Link to={"#"}>Men</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Women</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Baby</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className={cx("item")}>
              <Link to={routesConfig.blogs}>Blogs</Link>
            </div>
            <div className={cx("item")}>
              <Link to={routesConfig.contacts}>Contact</Link>
            </div>
            <div className={cx("bag")}>
              <Link to={"#"}>
                <i className="fa fa-shopping-bag">
                  <span>99+</span>
                </i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("menu")}>
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-8 col-md-8 col-sm-8 col-8">
              <div className={cx("logo")}>
                <img
                  src="https://preview.colorlib.com/theme/fashi/img/logo.png.webp"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <Link to={"#"}>
                    <i className="fa fa-user"></i>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <Link to={"#"}>
                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("menu-mobile")}>
                    <Link to={"#"} onClick={handleShow}>
                      {show ? (
                        <i className="fa fa-close"></i>
                      ) : (
                        <i className="fa fa-align-justify"></i>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx(show ? "show-menu" : "hiden-menu")}>
        <div className="row g-0">
          <div className="col-12">
            <div className={cx("item-mobile")}>
              <ul className={cx("nav-menu")}>
                <div className="container">
                  <li>
                    <div className="row g-0">
                      <div className="col-12">
                        <div className={cx("text")}>
                          <Link
                            to={routesConfig.home}
                            onClick={(e) => setShow(false)}
                          >
                            Home
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row g-0">
                      <div className="col-11">
                        <div className={cx("text")}>
                          <Link to={"#"} onClick={(e) => setShow(false)}>
                            Collections
                          </Link>
                        </div>
                      </div>
                      <div className="col-1">
                        <div
                          className={cx("drop-down")}
                          onClick={handleChildren}
                        >
                          <i className="fa fa-angle-down"></i>
                        </div>
                      </div>
                    </div>
                    <ul
                      className={cx(
                        showchildren ? "show-children" : "hiden-children"
                      )}
                    >
                      <div className={cx("text-children")}>
                        <li>Men</li>
                      </div>
                      <div className={cx("text-children")}>
                        <li>Women</li>
                      </div>
                      <div className={cx("text-children")}>
                        <li>Baby</li>
                      </div>
                    </ul>
                  </li>
                  <li>
                    <div className="row g-0">
                      <div className="col-12">
                        <div className={cx("text")}>
                          <Link
                            to={routesConfig.blogs}
                            onClick={(e) => setShow(false)}
                          >
                            Blogs
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row g-0">
                      <div className="col-12">
                        <div className={cx("text")}>
                          <Link to={"#"} onClick={(e) => setShow(false)}>
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row g-0">
                      <div className="col-12">
                        <div className={cx("text")}>
                          <Link to={"#"} onClick={handleLogout}>
                            {full_name ? (
                              <label>Logout</label>
                            ) : (
                              <label>Login</label>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
