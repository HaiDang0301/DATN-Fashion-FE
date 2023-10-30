import className from "classnames/bind";
import styles from "./OrderDetail.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ordersAPI from "../../../api/User/ordersAPI";
const cx = className.bind(styles);
function OrdersDetail() {
  document.title = "Order Detail";
  const id = useParams().id;
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : sessionStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      const result = await ordersAPI.show(id);
      setOrders(result.data);
    };
    fetchOrder();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className={cx("checkout")}>
          <div className="row">
            <div className="col-lg-12">
              <div className={cx("title")}>
                <h5>Your Order</h5>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              {orders.orders
                ? orders.orders.map((item, index) => (
                    <div className={cx("box-item")} key={index}>
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                            <div className={cx("image")}>
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className={cx("information")}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className={cx("product-name")}>
                                    {item.product_name}
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className={cx("size")}>
                                    Size : {item.size}
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className={cx("total-price")}>
                                    Quantity : {item.quantity}
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className={cx("price")}>
                                    Price : $
                                    {Number(item.price).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersDetail;
