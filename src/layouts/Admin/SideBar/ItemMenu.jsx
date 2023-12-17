import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ItemMenu.module.scss";
const cx = classNames.bind(styles);
function ItemMenu(props) {
  return (
    <div className={cx("item-menu")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Link to={props.link}>
              <i className={props.icon}></i>
              <span>{props.title}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemMenu;
