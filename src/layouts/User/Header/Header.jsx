import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../../assets/logo.png";
import routesConfig from "../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import modalAPI from "../../../api/Admin/modalAPI";
import cartAPI from "../../../api/User/cartAPI";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);
function Header() {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  let decode = "";
  if (token) {
    decode = jwt_decode(token);
  }
  const increase = useSelector((quantity) => quantity.increase);
  const decrease = useSelector((quantity) => quantity.decrease);
  const [language, setLanguage] = useState("ENG");
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState();
  const [nameProduct, setNameProduct] = useState();
  const [checkLogin, setCheckLogin] = useState(false);
  const [check, setCheck] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [collections, setCollections] = useState([]);
  const [show, setShow] = useState(false);
  const [searchMobile, setSearchMobile] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);
  useEffect(() => {
    if (token) {
      setCheckLogin(true);
    }
    const params = "collections";
    const fetchAPI = async () => {
      const result = await modalAPI.getAll(params);
      setCollections(result.data);
    };
    const fetchCart = async () => {
      const result = await cartAPI.index(token);

      if (result.data) {
        let sum = 0;
        result.data.carts.map((quantity) => {
          sum += Number(quantity.quantity);
        });
        setQuantity(sum);
        setCart(result.data.carts);
      }
    };
    fetchCart();
    fetchAPI();
  }, [increase, decrease]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setTimeout(() => {
      navigate(routesConfig.login);
    }, 100);
  };
  const handleSearch = async () => {
    navigate(`/collections?name=${nameProduct}`);
  };
  const handleCart = () => {
    navigate(routesConfig.CartDetail);
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
                              <Link
                                to={
                                  token
                                    ? routesConfig.Profile
                                    : routesConfig.login
                                }
                              >
                                My Account
                              </Link>
                            </li>
                            {decode.role === "admin" ? (
                              <li>
                                <Link to={routesConfig.AdminHome}>Admin</Link>
                              </li>
                            ) : null}
                            {decode.role === "client" ? (
                              <li>
                                <Link to={"#"}>Order</Link>
                              </li>
                            ) : (
                              <li>
                                <Link to={"#"}>Order</Link>
                              </li>
                            )}
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
                            onChange={(e) => setNameProduct(e.target.value)}
                          />
                          <button to={"#"} onClick={handleSearch}>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                    <div className={cx("shopping-cart")}>
                      <div className={cx("cart")}>
                        <span>
                          {quantity ? (quantity < 99 ? quantity : 99 + "+") : 0}
                        </span>
                      </div>
                      <div className={cx("cart-detailt")}>
                        {cart.length > 0 ? (
                          <div className={cx("product-item")}>
                            <div className="container">
                              {cart
                                ? cart.map((item, index) => (
                                    <div className="row" key={index}>
                                      <div className="col-lg-4 col-md-4 col-sm-4">
                                        <img src={item.image} alt="" />
                                      </div>
                                      <div className="col-lg-8 col-md-4 col-sm-4">
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <div className={cx("product_name")}>
                                              <span>{item.product_name}</span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className={cx("size")}>
                                              <span>Size : {item.size}</span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className={cx("quantity")}>
                                              <span>
                                                Quantity : {item.quantity}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className={cx("price")}>
                                              <span>
                                                Price :{" "}
                                                {Number(
                                                  item.price
                                                ).toLocaleString()}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className={cx("total-price")}>
                                              <span>
                                                Total Price: $
                                                {Number(
                                                  item.price * item.quantity
                                                ).toLocaleString()}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : null}
                            </div>
                            <button onClick={handleCart}>
                              Proceed to order
                            </button>
                          </div>
                        ) : (
                          "No Product"
                        )}
                      </div>
                    </div>
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
              <div className="col-lg-2 col-md-2 col-sm-3 col-2">
                <ul className={cx("collections")}>
                  <li>
                    <Link to={"/collections"}>Collection</Link>
                    <ul className={cx("collection")}>
                      {collections
                        ? collections.map((item, index) => (
                            <Link
                              key={index}
                              to={`/collections/${item.collections}`}
                            >
                              <li key={index}>{item.collections}</li>
                            </Link>
                          ))
                        : null}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-1 col-2">
                <ul className={cx("new-product")}>
                  <Link to={"/collections/new-products"}>
                    <li>New</li>
                  </Link>
                  <ul className={cx("category")}>
                    {collections
                      ? collections.map((item) =>
                          item.categories.map((i, index) => (
                            <Link to={`/collections/${i.category}`} key={index}>
                              <li>{i.category}</li>
                            </Link>
                          ))
                        )
                      : null}
                  </ul>
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={"/collections/sale"}>Sale</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={routesConfig.blogs}>Blog</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={"#"}>Contact</Link>
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
              <Link to={token ? routesConfig.Profile : routesConfig.login}>
                <i className="fa fa-user"> My Account</i>
              </Link>
            </li>
            <li>
              <Link to={"/collections/sale"}>
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
                  {"  "} Language <i className="fa fa-angle-down"></i>
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
                name="search"
                id="search"
                placeholder="Enter the product name"
                onChange={(e) => setNameProduct(e.target.value)}
              />
              <button onClick={handleSearch}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className={cx("cart-mobile")}>
            <Link to={routesConfig.CartDetail}>
              <i className="fa fa-shopping-cart">
                <span>
                  {quantity ? (quantity < 99 ? quantity : 99 + "+") : 0}
                </span>
              </i>
            </Link>
          </div>
        </div>
        <div className={cx("logo-mobile")}>
          <div className="container">
            <Link to={routesConfig.home}>
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>
        <div className={cx("menu-collections")}>
          <div className="container">
            <ul className={cx("collection-mobile")}>
              <li>
                <Link
                  to={"/collections"}
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
                  {collections
                    ? collections.map((item, index) => (
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
        </div>
      </div>
    </header>
  );
}
export default Header;
