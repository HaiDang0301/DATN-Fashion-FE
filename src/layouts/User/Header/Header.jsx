import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../../assets/logo.png";
import routesConfig from "../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import modalAPI from "../../../api/Admin/modalAPI";
const cx = classNames.bind(styles);
function Header() {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [language, setLanguage] = useState("ENG");
  const [cart, setCart] = useState(0);
  const [checkLogin, setCheckLogin] = useState(false);
  const [check, setCheck] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [searchMobile, setSearchMobile] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);
  useEffect(() => {
    if (token) {
      setCheckLogin(true);
    }
  }, []);
  useEffect(() => {
    const params = "collections";
    const fetchAPI = async () => {
      const result = await modalAPI.getAll(params);
      setData(result.data);
    };
    fetchAPI();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setTimeout(() => {
      navigate(routesConfig.login);
    }, 100);
  };
  return (
    <header className={cx("header-setion")}>
      <div className={cx("header-top")}>
        <div className={cx("container g-0")}>
          <div className="row g-0">
            <div className="col-lg-10 col-md-9 col-sm-8 col-7">
              <div className={cx("header-infor")}>
                <div className="row g-0">
                  <div className="col-lg-4 col-md-5 col-sm-12 col-12">
                    <i className="fa fa-thumbs-o-up"></i>
                    <span> SATISFACTION 100% GUARANTEED</span>
                  </div>
                  <div className="col-lg-8 col-md-7 col-sm-12 col-12">
                    <i className="fa fa-truck"></i>
                    <span> Free shipping on orders over $99</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-5">
              <div className={cx("language")}>
                <label htmlFor="language" className={cx("text-language")}>
                  <span>
                    Your Language:
                    <Link>
                      {language} <i className="	fa fa-angle-down"></i>
                    </Link>
                  </span>
                  <ul className={cx("choose-language")}>
                    <Link to={"#"} onClick={(e) => setLanguage("ENG")}>
                      <li>English</li>
                    </Link>
                    <Link
                      to={"#"}
                      onClick={(e) => {
                        setLanguage("VN");
                      }}
                    >
                      <li>Vietnamese</li>
                    </Link>
                  </ul>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("nav-item")}>
        <div className={cx("menu-wrapper")}>
          <div className="container g-0">
            <div className="row">
              <div className="col-lg-6 col-md-4 col-sm-4 col-4">
                <div className={cx("logo")}>
                  <Link to={routesConfig.home}>
                    <img src={logo}></img>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className={cx("title")}>
                      Welcome to our online store!
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-9 col-8">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className={cx("quick-access")}>
                          <ul>
                            <li>
                              <Link to={routesConfig.Profile}>My Account</Link>
                            </li>
                            <li>
                              <Link to={"#"}>Contact</Link>
                            </li>
                            <li>
                              {checkLogin ? (
                                <>
                                  <Link onClick={handleLogout}>Log Out</Link>
                                </>
                              ) : (
                                <>
                                  <Link to={routesConfig.login}>Log In</Link>
                                </>
                              )}
                            </li>{" "}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("search")}>
                          <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Enter the product name"
                          />
                          <Link to={"#"}>
                            <i className="fa fa-search"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                    <ul className={cx("shopping-cart")}>
                      <li>
                        <Link to={"#"}>
                          <div className={cx("cart")}>
                            <span>{cart}</span>
                          </div>
                        </Link>
                        <ul className={cx("cart-detailt")}>
                          <li>There are currently no orders</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("nav-menu")}>
        <div className={cx("main-menu")}>
          <div className="container g-0">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={routesConfig.home}>Home</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <ul className={cx("collections")}>
                  <li>
                    <Link to={"/collections"}>Collection</Link>
                    <ul className={cx("collection")}>
                      {data
                        ? data.map((item, index) => (
                            <Link
                              key={index}
                              to={`/collections/${item.collections}`}
                            >
                              <li>{item.collections}</li>
                            </Link>
                          ))
                        : null}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <ul className={cx("categories")}>
                  <Link>
                    <li>Category</li>
                  </Link>
                  <ul className={cx("category")}>
                    {data
                      ? data.map((item) =>
                          item.categories.map((i, index) => (
                            <Link to={"#"} key={index}>
                              <li>{i.category}</li>
                            </Link>
                          ))
                        )
                      : null}
                  </ul>
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={"#"}>Sale</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={routesConfig.blogs}>Blog</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={routesConfig.blogs}>Delivery</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{
          width: 50 + "%",
          background: "#303c4b",
          position: "fixed",
          top: "50px",
        }}
      >
        <Offcanvas.Body
          style={{ color: "white", padding: "0" }}
          className={cx("item")}
        >
          <ul>
            <li>
              <Link to={routesConfig.home}>
                <i className="fa fa-home"> Home</i>
              </Link>
            </li>
            <li>
              <Link to={routesConfig.Profile}>
                <i className="fa fa-user"> My Account</i>
              </Link>
            </li>
            <li>
              <Link to={""}>
                <i className="fa fa-tag"> Sale</i>
              </Link>
            </li>
            <li>
              <Link to={routesConfig.blogs}>
                <i className="fa fa-bold"> Blog</i>
              </Link>
            </li>

            <li>
              <Link to={"#"}>
                <i className="fa fa-comment"> Contact</i>
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <i className="fa fa-truck"> Delivery</i>
              </Link>
            </li>
            <li>
              <Link to={"#"} onClick={(e) => setCheck(!check)}>
                <i className="fa fa-language">
                  Your Language <i className="fa fa-angle-down"></i>
                </i>
              </Link>
              <ul className={cx(check ? "show-language" : "hiden-language")}>
                <Link to={"#"} onClick={(e) => setCheck(!check)}>
                  <li>EN</li>
                </Link>
                <Link to={"#"} onClick={(e) => setCheck(!check)}>
                  <li>VN</li>
                </Link>
              </ul>
            </li>
            <li>
              <i className="fa fa-power-off"></i>{" "}
              {checkLogin ? (
                <>
                  <Link onClick={handleLogout}>Log Out</Link>
                </>
              ) : (
                <>
                  <Link to={routesConfig.login}>Log In</Link>
                </>
              )}
            </li>
            <li>
              <Link to={"#"}>
                <i className="fa fa-question-circle"> About us</i>
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      <div className={cx("menu")}>
        <div className={cx("main")}>
          <div className={cx("icon-menu")}>
            <Link to={"#"} onClick={handleShow}>
              <i className="fa fa-align-justify"></i>
            </Link>
          </div>
          <div className={cx("btn-search")}>
            <Link
              to={"#"}
              onClick={(e) => {
                setSearchMobile(!searchMobile);
              }}
            >
              <i className="fa fa-search"></i>
            </Link>
            <div className={cx(searchMobile ? "show-search" : "hiden-search")}>
              <input
                type="search"
                name=""
                id=""
                placeholder="Enter the product name"
              />
              <button>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className={cx("cart-mobile")}>
            <Link>
              <i className="fa fa-shopping-cart">
                <span>{cart}</span>
              </i>
            </Link>
          </div>
        </div>
        <div className={cx("logo-mobile")}>
          <div className="container">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className={cx("menu-collections")}>
          <div className="container">
            <ul className={cx("collection-mobile")}>
              <li>
                <Link
                  to={"#"}
                  onClick={(e) => {
                    setShowCollection(!showCollection);
                  }}
                >
                  <h5>Collection</h5>
                  <i
                    className={
                      showCollection ? "fa fa-angle-down" : "fa fa-angle-right"
                    }
                  ></i>
                </Link>
                <ul className={cx(showCollection ? "show-lv2" : "hiden-lv2")}>
                  {data
                    ? data.map((item, index) => (
                        <Link key={index} to={"#"}>
                          <li>{item.collections}</li>
                        </Link>
                      ))
                    : null}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
