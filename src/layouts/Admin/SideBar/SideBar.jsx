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
              <Link to={routesConfig.AdminHome}>Home</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminOrders}>Oders</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminProducts}>Products</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminProducers}>Producers</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminBlogs}>Blogs</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.Statistical}>Statistical</Link>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className={cx("avatar")}>
        <div className={cx("img")}>
          <Link to={"#"}>
            <img
              src={profile && profile.image ? profile.image.url : null}
              alt=""
            />
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
          title="Home"
          icon="fa fa-home"
          link={routesConfig.AdminHome}
        ></ItemMenu>
        <ItemMenu
          title="Orders"
          icon="fa fa-shopping-cart"
          link={routesConfig.AdminOrders}
        ></ItemMenu>
        <ItemMenu
          title="Clients"
          icon="fa fa-users"
          link={routesConfig.AdminClients}
        ></ItemMenu>
        <ItemMenu
          title="Producers"
          icon="fa fa-product-hunt"
          link={routesConfig.AdminProducers}
        ></ItemMenu>
        <ItemMenu
          title="Products"
          icon="fa fa-barcode"
          link={routesConfig.AdminProducts}
        ></ItemMenu>
        <ItemMenu
          title="Statistical"
          icon="fa fa-usd"
          link={routesConfig.Statistical}
        ></ItemMenu>
        <ItemMenu
          title="Blogs"
          icon="fa fa-file-text"
          link={routesConfig.AdminBlogs}
        ></ItemMenu>
        <ItemMenu
          title="Banners"
          icon="fa fa-audio-description"
          link={routesConfig.AdminBanners}
        ></ItemMenu>
        <ItemMenu
          title="User Home"
          icon="fa fa-users"
          link={routesConfig.home}
        ></ItemMenu>
        <ItemMenu title="Setting" icon="fa fa-cogs"></ItemMenu>
      </div>
    </div>
  );
}

export default SideBar;
