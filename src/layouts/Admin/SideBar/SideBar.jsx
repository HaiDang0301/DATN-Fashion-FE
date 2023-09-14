import { useState } from "react";
import routesConfig from "../../../config/routes";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import menu from "../../../assets/menu.png";
import avatar from "../../../assets/avatar.jpg";
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import ItemMenu from "./ItemMenu";
const cx = classNames.bind(styles);
function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
              <Link to={routesConfig.adminOrders}>Oders</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.adminProducts}>Products</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={"#"}>Enter Stonk</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={"#"}>Sales</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={routesConfig.AdminBlogs}>Blogs</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={"#"}>Inventory</Link>
            </div>
            <div className={cx("item-mobile")}>
              <Link to={"#"}>Profit</Link>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className={cx("avatar")}>
        <div className={cx("img")}>
          <Link to={"#"}>
            <img src={avatar} alt="" />
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
          title="Order"
          icon="fa fa-shopping-cart"
          link={routesConfig.adminOrders}
        ></ItemMenu>
        <ItemMenu
          title="Products"
          icon="fa fa-barcode"
          link={routesConfig.adminProducts}
        ></ItemMenu>
        <ItemMenu
          title="Client"
          icon="fa fa-users"
          link={routesConfig.adminClients}
        ></ItemMenu>
        <ItemMenu
          title="Sales"
          icon="fa fa-signal"
          link={routesConfig.adminSales}
        ></ItemMenu>
        <ItemMenu
          title="Inventory"
          icon="fa fa-list-alt"
          link={routesConfig.adminInventory}
        ></ItemMenu>
        <ItemMenu
          title="Profit"
          icon="fa fa-usd"
          link={routesConfig.adminProfit}
        ></ItemMenu>
        <ItemMenu
          title="Blogs"
          icon="fa fa-file-text"
          link={routesConfig.AdminBlogs}
        ></ItemMenu>
        <ItemMenu title="Setting" icon="fa fa-cogs"></ItemMenu>
      </div>
    </div>
  );
}

export default SideBar;
