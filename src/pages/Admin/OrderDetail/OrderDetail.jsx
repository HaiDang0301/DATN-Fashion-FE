import className from "classnames/bind";
import styles from "./OrderDetail.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ordersAPI from "../../../api/Admin/ordersAPI";
import Table from "react-bootstrap/Table";
const cx = className.bind(styles);
function ViewOrders() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [city, setCity] = useState();
  const [districts, setDistricts] = useState();
  const [ward, setWard] = useState();
  useEffect(() => {
    const fetchOrders = async () => {
      const result = await ordersAPI.show(id);
      setData(result.data);
      if (result.data) {
        axios
          .get(
            `https://provinces.open-api.vn/api/p/${result.data.address.city}?depth=2`
          )
          .then((res) => {
            setCity(res.data);
          });
        axios
          .get(
            `https://provinces.open-api.vn/api/d/${result.data.address.district}?depth=2`
          )
          .then((res) => {
            setDistricts(res.data);
          });
        axios
          .get(
            `https://provinces.open-api.vn/api/w/${result.data.address.ward}?depth=2`
          )
          .then((res) => {
            setWard(res.data);
          });
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className="row">
          <div className="col-lg-11">
            <h5>Information Order</h5>
          </div>
          <div className="col-lg-1">
            <div className={cx("back")}>
              <button onClick={(e) => navigate(-1)}>
                <i className="fa fa-arrow-left"></i>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={cx("info-customer")}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col">Order Code</th>
                  <th scope="col">Client</th>
                  <th scope="col">Total Money</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">City</th>
                  <th scope="col">District</th>
                  <th scope="col">Ward</th>
                  <th scope="col">Adress Home</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  <tr>
                    <td>{data.orders_code}</td>
                    <td>{data.full_name}</td>
                    <td>${data.totalMoney}</td>
                    <td>{data.phone}</td>
                    <td>{city ? city.name : null}</td>
                    <td>{districts ? districts.name : null}</td>
                    <td>{ward ? ward.name : null}</td>
                    <td>{data.address ? data.address.address_home : null}</td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-lg-12">
          <div className={cx("title")}>
            <h5>Products Order</h5>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          {data.orders
            ? data.orders.map((item, index) => (
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
                                Price : ${Number(item.price).toLocaleString()}
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
  );
}

export default ViewOrders;
