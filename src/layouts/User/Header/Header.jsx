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
import ordersAPI from "../../../api/User/ordersAPI";
const cx = classNames.bind(styles);
function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : sessionStorage.getItem("token");
  let decode = "";
  if (token) {
    decode = jwt_decode(token);
  }
  const status = useSelector((status) => status.resetCart);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState();
  const [orders, setOrders] = useState([]);
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
      const result = await modalAPI.index(params);
      setCollections(result.data);
    };
    const fetchCart = async () => {
      const result = await cartAPI.index();
      if (result.data && result.data.carts) {
        let sum = 0;
        result.data.carts.map((quantity) => {
          sum += Number(quantity.quantity);
        });
        setQuantity(sum);
        setCart(result.data.carts);
      }
    };
    const fetchOrder = async () => {
      const result = await ordersAPI.index();
      if (result.data && result.data.findOrders) {
        setOrders(result.data.findOrders.length);
      }
    };
    fetchOrder();
    fetchCart();
    fetchAPI();
  }, [status]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setTimeout(() => {
      navigate(routesConfig.login);
    }, 100);
  };
  const handleSearch = async () => {
    navigate(`/collections?name=${nameProduct.toUpperCase()}`);
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
                    <span> Sự hài lòng 100% được đảm bảo</span>
                  </div>
                  <div className="col-lg-8 col-md-7 col-sm-12 col-12">
                    <i className="fa fa-truck"></i>
                    <span>
                      {" "}
                      Miễn phí vận chuyển các đơn đặt hàng trên 2.000.0000
                    </span>
                  </div>
                </div>
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
                      Chào mừng bạn đến với cửa hàng!
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
                                Tài Khoản
                              </Link>
                            </li>
                            {decode.role === "admin" ? (
                              <li>
                                <Link to={routesConfig.AdminHome}>
                                  Trang Quản Trị
                                </Link>
                              </li>
                            ) : (
                              <li>
                                <div className={cx("order")}>
                                  <Link to={routesConfig.Orders}>Đơn Hàng</Link>
                                  {orders && orders > 0 ? (
                                    <div className={cx("total-order")}>
                                      <span>{orders}</span>
                                    </div>
                                  ) : null}
                                </div>
                              </li>
                            )}
                            <li>
                              {checkLogin ? (
                                <>
                                  <Link onClick={handleLogout}>Đăng Xuất</Link>
                                </>
                              ) : (
                                <>
                                  <Link to={routesConfig.login}>Đăng Nhập</Link>
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
                            placeholder="Nhập tên sản phẩm tìm kiếm"
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
                                              <span>
                                                Kích Thước : {item.size}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className={cx("quantity")}>
                                              <span>
                                                Số Lượng : {item.quantity}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className={cx("price")}>
                                              <span>
                                                Giá :{" "}
                                                {Number(
                                                  item.price
                                                ).toLocaleString()}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className={cx("total-price")}>
                                              <span>
                                                Tổng Tiền: $
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
                              Tiến hành đặt hàng
                            </button>
                          </div>
                        ) : (
                          <div className={cx("cart-none")}>
                            Chưa có sản phẩm nào trong giỏ hàng
                          </div>
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
                <Link to={routesConfig.home}>Trang Chủ</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-2">
                <ul className={cx("collections")}>
                  <li>
                    <Link to={"/collections"}>Bộ Sưu Tập</Link>
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
                    <li>Sản Phẩm Mới</li>
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
                <Link to={"/collections/sale"}>Giảm Giá</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={routesConfig.blogs}>Bài Viết</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                <Link to={routesConfig.Contacts}>Liên Hệ</Link>
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
                <i className="fa fa-home"> Trang Chủ</i>
              </Link>
            </li>
            <li>
              <Link to={token ? routesConfig.Profile : routesConfig.login}>
                <i className="fa fa-user"> Tài Khoản</i>
              </Link>
            </li>
            <li>
              <div className={cx("order-mobile")}>
                <Link to={token ? routesConfig.Orders : routesConfig.login}>
                  <i className="fa fa-shopping-cart"> Đơn Hàng</i>
                </Link>
                {orders && orders > 0 ? (
                  <div className={cx("total-order-mobile")}>
                    <span>{orders}</span>
                  </div>
                ) : null}
              </div>
            </li>
            <li>
              <Link to={"/collections/sale"}>
                <i className="fa fa-tag"> Giảm Giá</i>
              </Link>
            </li>
            <li>
              <Link to={routesConfig.blogs}>
                <i className="fa fa-bold"> Bài Viết</i>
              </Link>
            </li>
            <li>
              <Link to={routesConfig.Contacts}>
                <i className="fa fa-question-circle"> Liên Hệ</i>
              </Link>
            </li>
            <li>
              <i className="fa fa-power-off"></i>{" "}
              {checkLogin ? (
                <>
                  <Link onClick={handleLogout}>Đăng Xuất</Link>
                </>
              ) : (
                <>
                  <Link to={routesConfig.login}>Đăng Nhập</Link>
                </>
              )}
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
                name="search-mobile"
                id="search-mobile"
                placeholder="Nhập tên sản phẩm tìm kiếm"
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
                  {quantity ? (quantity < 99 ? quantity : 99 + "+") : null}
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
                  <h5>Bộ Sưu Tập</h5>
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
