import { useEffect, useState } from "react";
import routesConfig from "../../../config/routes";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import menu from "../../../assets/menu.png";
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import ItemMenu from "./ItemMenu";
import AuthsAPI from "../../../api/AuthsAPI";
const cx = classNames.bind(styles);
function SideBar() {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await AuthsAPI.profile();
      setProfile(result.data);
    };
    fetchAPI();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("menu")}>
        <Link to={"#"}>
          <img src={menu} alt="" onClick={handleShow} />
        </Link>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          backdrop="static"
          style={{ width: 50 + "%" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminHome}>Trang Chủ</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminOrders}>Đơn Hàng</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminProducts}>Sản Phẩm</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminProducers}>Nhà Cung Cấp</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminBlogs}>Bài Viết</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.Statistical}>
                Doanh Thu & Xuất, Nhập Hàng
              </Link>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className={cx("avatar")}>
        <div className={cx("img")}>
          <Link to={"#"}>
            {profile.image ? <img src={profile.image.url} alt="" /> : null}
          </Link>
          <p>Admin</p>
          <div className={cx("network-social")}>
            <Link
              to="https://www.facebook.com/profile.php?id=100023095460530"
              target="blank"
            >
              <i className="fa fa-facebook"></i>
            </Link>
            <Link
              to="https://www.facebook.com/profile.php?id=100023095460530"
              target="blank"
            >
              <i className="fa fa-twitter"></i>
            </Link>
            <Link
              to="https://www.facebook.com/profile.php?id=100023095460530"
              target="blank"
            >
              <i className="fa fa-instagram"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className={cx("metis-menu")}>
        <ItemMenu
          title="Trang Chủ"
          icon="fa fa-home"
          link={routesConfig.AdminHome}
        ></ItemMenu>
        <ItemMenu
          title="Đơn Hàng"
          icon="fa fa-shopping-cart"
          link={routesConfig.AdminOrders}
        ></ItemMenu>
        <ItemMenu
          title="Khách Hàng"
          icon="fa fa-users"
          link={routesConfig.AdminClients}
        ></ItemMenu>
        <ItemMenu
          title="Nhà Cung Cấp"
          icon="fa fa-product-hunt"
          link={routesConfig.AdminProducers}
        ></ItemMenu>
        <ItemMenu
          title="Sản Phẩm"
          icon="fa fa-barcode"
          link={routesConfig.AdminProducts}
        ></ItemMenu>
        <ItemMenu
          title="Doanh Thu & X,N Hàng"
          icon="fa fa-usd"
          link={routesConfig.Statistical}
        ></ItemMenu>
        <ItemMenu
          title="Bài Viết"
          icon="fa fa-file-text"
          link={routesConfig.AdminBlogs}
        ></ItemMenu>
        <ItemMenu
          title="Banners"
          icon="fa fa-audio-description"
          link={routesConfig.AdminBanners}
        ></ItemMenu>
        <ItemMenu
          title="Trang Khách Hàng"
          icon="fa fa-users"
          link={routesConfig.home}
        ></ItemMenu>
      </div>
    </div>
  );
}

export default SideBar;
