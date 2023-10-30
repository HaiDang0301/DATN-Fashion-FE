import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import className from "classnames/bind";
import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import ordersAPI from "../../../api/Admin/ordersAPI";
import formatDate from "../../../formatDate/formatDate";
const cx = className.bind(styles);
function AdminOrders() {
  document.title = "Admin | Orders";
  const [searchParam, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalMoney, setTotalMoney] = useState();
  const [id, setID] = useState();
  const [begin, setBegin] = useState();
  const [final, setFinal] = useState();
  const [reason, setReason] = useState();
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [disable, setDisable] = useState(true);
  const [disableDelivery, setDisableDelivery] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);
  const query = searchParam;
  useEffect(() => {
    const fetchOrders = async () => {
      const result = await ordersAPI.index(query);
      setOrders(result.data);
      if (result.data) {
        let total = 0;
        result.data.findOrders.map((item) => {
          total += item.totalMoney;
        });
        setTotalMoney(total);
      }
    };
    fetchOrders();
  }, [status, searchParam]);
  const handleDelivery = async (id) => {
    const data = { status: "delivery" };
    await ordersAPI
      .update(id, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Status Order Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
          setDisableDelivery(true);
          setDisable(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Server Errors", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleCancel = (id) => {
    setShow(true);
    setID(id);
  };
  const handleConfirm = async () => {
    const data = { status: "cancel", reason: reason };
    await ordersAPI
      .update(id, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Status Order Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
          setShow(false);
          setDisableDelivery(true);
          setDisable(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Server Errors", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleSuccess = async (id) => {
    const data = { status: "success" };
    await ordersAPI
      .update(id, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Status Order Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
          setDisable(true);
          setDisableDelivery(true);
          setDisableCancel(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Server Errors", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleChangeOrdersCode = (e) => {
    const ordersCode = e.target.value;
    setSearchParams({
      orders_code: ordersCode,
    });
  };
  const handleSearch = () => {
    setSearchParams({
      begin: begin,
      final: final,
    });
  };
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
  const handleDestroy = async (id) => {
    await ordersAPI
      .destroy(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Delete Orders Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Sever Errors", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
        }
      });
  };
  if (!orders) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("title-reason")}>
            <span>
              Reasons to cancel the order{" "}
              {id ? id.slice(-6).toUpperCase() : null} ​
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx("reason")}>
          <input
            placeholder="Enter the reason to cancel the order"
            onChange={(e) => setReason(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleConfirm()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="top-orders">
        <div className="container">
          <h5>Order List</h5>
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-12 col-12">
              <div className={cx("search-orders")}>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Enter ther Orders Code"
                  onChange={(e) => handleChangeOrdersCode(e)}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-7 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input
                      type="date"
                      name="bigin"
                      id="bigin"
                      onChange={(e) => setBegin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                  <div className={cx("title")}>
                    <span htmlFor="">to</span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input
                      type="date"
                      name="final"
                      id="final"
                      onChange={(e) => setFinal(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                  <div className={cx("btn-search")}>
                    <button onClick={(e) => handleSearch()}>
                      <i className="fa fa-search"> Search</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-2 col-sm-12 col-12">
              <div className={cx("select-sort")}>
                <select name="sort" id="sort" onChange={(e) => handleSort(e)}>
                  <option value="all_orders">All orders</option>
                  <option value="pending">Pending</option>
                  <option value="delivery">Delivery</option>
                  <option value="delivered">Delivery has been delivered</option>
                  <option value="decrease">Sort unit price reduction</option>
                  <option value="increase">Arrange unit price increase</option>
                </select>
              </div>
            </div>
          </div>
          <div className={cx("table-orders")}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Orders Code</th>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Total Money</th>
                  <th>Status Delivery</th>
                  <th>Update Status</th>
                  <th>Status Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.findOrders
                  ? orders.findOrders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.orders_code
                            ? item.orders_code.toUpperCase()
                            : null}
                        </td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>{item.full_name}</td>
                        <td>${Number(item.totalMoney).toLocaleString()}</td>
                        <td
                          className={cx(
                            item.status_delivery === "Cancel"
                              ? "status_cancel"
                              : "status_delivery"
                          )}
                        >
                          <span>
                            {item.status_delivery === "Cancel"
                              ? item.status_delivery +
                                " , " +
                                item.reason_cancel
                              : item.status_delivery}
                          </span>
                        </td>
                        <td>
                          <div className={cx("actions-delivery")}>
                            <div className="row g-0">
                              <div className="col-lg-4 col-md-4">
                                <div className={cx("btn-delivery")}>
                                  <button
                                    disabled={
                                      item.status_delivery === "Cancel"
                                        ? true
                                        : disableDelivery
                                    }
                                    onClick={(e) => handleDelivery(item._id)}
                                  >
                                    <i className="fa fa-truck"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4">
                                <div className={cx("btn-cancel")}>
                                  <button
                                    disabled={disableCancel}
                                    onClick={(e) => handleCancel(item._id)}
                                  >
                                    <i className="fa fa-ban"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4">
                                <div className={cx("btn-success")}>
                                  <button
                                    disabled={
                                      item.status_delivery === "Cancel"
                                        ? true
                                        : disable
                                    }
                                    onClick={(e) => handleSuccess(item._id)}
                                  >
                                    <i className="fa fa-check"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.status_payment === false ? "Unpaid" : "Paid"}
                        </td>
                        <td>
                          <div className={cx("actions")}>
                            <div className="row g-0">
                              <div className="col-lg-6">
                                <button onClick={(e) => navigate(item._id)}>
                                  <i className="fa fa-eye"></i>
                                </button>
                              </div>
                              <div className="col-lg-6">
                                {item.status_delivery === "Cancel" ||
                                item.status_delivery ===
                                  "Successful Delivery" ? (
                                  <button
                                    onClick={(e) => handleDestroy(item._id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </div>
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
          <div className={cx("total-bill")}>
            <span htmlFor="Total bills" id="bills">
              Total bills :{" "}
              {orders && orders.findOrders ? orders.findOrders.length : 0}
            </span>
            <span htmlFor="Total moneys" id="money">
              Total money : ${totalMoney ? totalMoney : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
