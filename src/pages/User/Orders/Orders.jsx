import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import formatDate from "../../../formatDate/formatDate";
import ordersAPI from "../../../api/User/ordersAPI";
const cx = classNames.bind(styles);
function Orders() {
  document.title = "Đơn Hàng";
  const [orders, setOrders] = useState();
  const [searchParam, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = searchParam;
  useEffect(() => {
    const fetchOrder = async () => {
      const result = await ordersAPI.index(params);
      setOrders(result.data);
    };
    fetchOrder();
  }, [params]);
  const handleSort = (e) => {
    const sort = e.target.value;
    setSearchParams({
      sort: sort,
    });
  };
  const handlePage = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newQuery = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newQuery);
  };
  if (!orders) return null;
  return (
    <div className={cx("wrapper")}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 col-md-8 col-sm-7 col-5">
            <h5>Đơn Hàng Của Bạn</h5>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-5 col-7">
            <select name="sort" id="sort" onChange={(e) => handleSort(e)}>
              <option value="all_orders">Tất cả đơn hàng</option>
              <option value="pending">Chờ Xử Lý</option>
              <option value="delivery">Đang Giao Hàng</option>
              <option value="delivered">Giao Hàng Hoàn Tất</option>
              <option value="decrease">Theo Đơn Hàng Giảm Dần</option>
              <option value="increase">Theo Đơn Hàng Tăng Dần</option>
            </select>
          </div>
        </div>
        <div className={cx("table-orders")}>
          <Table striped className={cx("table")}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã Đơn Hàng</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái Giao Hàng</th>
                <th>Thanh Toán</th>
                <th>Ngày Đặt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.findOrders
                ? orders.findOrders.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {" "}
                        {item.orders_code
                          ? item.orders_code.toUpperCase()
                          : null}
                      </td>
                      <td>{Number(item.totalMoney).toLocaleString()}</td>
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
                        {item.status_payment === false
                          ? "Chưa Thanh Toán"
                          : "Đã Thanh Toán"}
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>
                        <Link to={item._id}>Chi Tiết</Link>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
        <div className={cx("panigate")}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePage}
            pageCount={orders.totalPage || 1}
            previousLabel="<"
            forcePage={searchParam.get("page") - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;
