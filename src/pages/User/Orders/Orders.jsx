import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import formatDate from "../../../formatDate/formatDate";
import ordersAPI from "../../../api/User/ordersAPI";
const cx = classNames.bind(styles);
function Orders() {
  document.title = "My Orders";
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchOrder = async () => {
      const result = await ordersAPI.index(token);
      setOrders(result.data);
    };
    fetchOrder();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h5>Your Orders</h5>
          </div>
        </div>
        <div className={cx("table-orders")}>
          <Table striped className={cx("table")}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Orders Code</th>
                <th>Total Money</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders
                ? orders.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item._id.slice(-6).toUpperCase()}</td>
                      <td>${item.totalMoney}</td>
                      <td
                        className={cx(
                          item.status_delivery === "Cancel"
                            ? "status_cancel"
                            : "status_delivery"
                        )}
                      >
                        <span>
                          {item.status_delivery === "Cancel"
                            ? item.status_delivery + " , " + item.reason_cancel
                            : item.status_delivery}
                        </span>
                      </td>
                      <td>
                        {item.status_payment === false ? "Unpaid" : "Paid"}
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>
                        <Link to={item._id}>View</Link>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
