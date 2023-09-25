import React, { useState } from "react";
import routesConfig from "../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
const cx = classNames.bind(styles);
function Header() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("H");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <header className={cx("header-setion")}>
      <div className={cx("header-top")}>
        <div className={cx("container g-0")}>
          <div className="row">
            <div className="col-lg-4 col-sm-4 col-md-4">
              <div className={cx("hd-left")}>
                <i className="fa fa-envelope"> dinhhaidang1003@gmail.com</i>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 col-md-6">
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
            <div className="col-lg-2 col-md-2 col-sm-2">
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
                            <Link to={routesConfig.login}>
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
              <Link to={routesConfig.blogs}>Home</Link>
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
              <Link to={"#"}>Promotion</Link>
            </div>
            <div className={cx("item")}>
              <Link to={routesConfig.blogs}>Blog</Link>
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
        <div className="container g-0">
          <div className="row">
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
                      <i className="fa fa-align-justify"></i>
                    </Link>
                    <Offcanvas
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      placement="end"
                      style={{ width: 60 + "%" }}
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                          <h1>Menu</h1>
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <div className={cx("item-mobile")}>
                          <Link to={routesConfig.home}>Home</Link>
                        </div>
                        <div className={cx("item-mobile")}>
                          <Link to={routesConfig.products}>Men</Link>
                        </div>
                        <div className={cx("item-mobile")}>
                          <Link to={routesConfig.products}>Women</Link>
                        </div>
                        <div className={cx("item-mobile")}>
                          <Link to={routesConfig.products}>
                            Baby Collection
                          </Link>
                        </div>
                        <div className={cx("item-mobile")}>
                          <Link to={routesConfig.blogs}>Blog</Link>
                        </div>
                        <div className={cx("item-mobile")}>
                          <Link to={routesConfig.contacts}>Contact</Link>
                        </div>
                        <div className={cx("item-mobile")}>
                          <Link to={routesConfig.login}>Logout</Link>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
