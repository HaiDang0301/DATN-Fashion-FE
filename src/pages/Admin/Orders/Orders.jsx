import { Link } from "react-router-dom";
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
  const [orders, setOrders] = useState();
  const [id, setID] = useState();
  const [reason, setReason] = useState();
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    const fetchOrders = async () => {
      const result = await ordersAPI.index();
      setOrders(result.data);
    };
    fetchOrders();
  }, [status]);
  const handleDelivery = async (id) => {
    const data = { id: id, status: "delivery" };
    await ordersAPI
      .update(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Status Order Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
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
    const data = { id: id, status: "cancel", reason_cancel: reason };
    await ordersAPI
      .update(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Status Order Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
          setShow(false);
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
    const data = { id: id, status: "success" };
    await ordersAPI
      .update(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Status Order Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setStatus(!status);
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
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-7 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input type="date" name="bigin" id="bigin" />
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                  <div className={cx("title")}>
                    <label htmlFor="">to</label>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input type="date" name="final" id="final" />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                  <div className={cx("btn-search")}>
                    <Link to={"#"}>
                      <i className="fa fa-search"> Search</i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-2 col-sm-12 col-12">
              <div className={cx("select-sort")}>
                <select name="sort" id="sort">
                  <option value="default">Default</option>
                  <option value="reduce">Sort unit price reduction</option>
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
                {orders
                  ? orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item._id.slice(-6).toUpperCase()}</td>
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
                              <div className="col-lg-4">
                                <div className={cx("btn-delivery")}>
                                  <button
                                    onClick={(e) => handleDelivery(item._id)}
                                  >
                                    <i className="fa fa-truck"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className={cx("btn-cancel")}>
                                  <button
                                    onClick={(e) => handleCancel(item._id)}
                                  >
                                    <i className="fa fa-ban"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className={cx("btn-success")}>
                                  <button
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
                                <button>
                                  <i className="fa fa-eye"></i>
                                </button>
                              </div>
                              <div className="col-lg-6">
                                <button>
                                  <i className="fa fa-trash"></i>
                                </button>
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
          <div className={cx("total-bill")}>
            <label htmlFor="Total bills">Total bills : 0</label>
            <label htmlFor="Total moneys">Total money : 0</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
