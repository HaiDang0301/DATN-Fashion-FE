import React, { useState } from "react";
import routesConfig from "../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import menu from "../../../assets/menu.png";
import Offcanvas from "react-bootstrap/Offcanvas";
const cx = classNames.bind(styles);
function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <header className={cx("header-setion")}>
      <div className={cx("header-top")}>
        <div className={cx("container")}>
          <div className={cx("hd-left")}>
            <i className="fa fa-envelope"> dinhhaidang1003@gmail.com</i>
          </div>
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
          <div className={cx("login")}>
            <i className="fa fa-user"></i>
            <Link to={routesConfig.login}>Login</Link>
          </div>
        </div>
      </div>
      <div className={cx("inner-header")}>
        <div className={cx("row")}>
          <div className={cx("logo")}>
            <Link to={routesConfig.home}>
              <img src="https://preview.colorlib.com/theme/fashi/img/logo.png.webp"></img>
            </Link>
          </div>
          <div className={cx("search")}>
            <input type="search" placeholder="Enter the product to find" />
            <button className={cx("btn-search")}>
              <i className="fa fa-search"></i>
            </button>
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
      <div className={cx("nav-item")}>
        <div className={cx("menu-wrapper")}>
          <div className={cx("item")}>
            <Link to={routesConfig.home}>Home</Link>
          </div>
          <div className={cx("item")}>
            <Link to={routesConfig.products}>Men</Link>
          </div>
          <div className={cx("item")}>
            <Link to={routesConfig.products}>Women</Link>
          </div>
          <div className={cx("item")}>
            <Link to={routesConfig.products}>Baby Collection</Link>
          </div>
          <div className={cx("item")}>
            <Link to={routesConfig.blogs}>Blog</Link>
          </div>
          <div className={cx("item")}>
            <Link to={routesConfig.contacts}>Contact</Link>
          </div>
        </div>
        <div className={cx("menu")}>
          <div className={cx("menu-mobile")}>
            <Link to={"#"} onClick={handleShow}>
              Menu
              <img src={menu} alt="" />
            </Link>
            <Offcanvas
              show={show}
              onHide={handleClose}
              backdrop="static"
              placement="end"
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
                  <Link to={routesConfig.products}>Baby Collection</Link>
                </div>
                <div className={cx("item-mobile")}>
                  <Link to={routesConfig.blogs}>Blog</Link>
                </div>
                <div className={cx("item-mobile")}>
                  <Link to={routesConfig.contacts}>Contact</Link>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
