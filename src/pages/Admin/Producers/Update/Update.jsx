import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import className from "classnames/bind";
import styles from "./Update.module.scss";
import producersApi from "../../../../api/Admin/producersAPI";
import { useEffect, useState } from "react";
const cx = className.bind(styles);
function UpdateProducers() {
  document.title = "Admin | Update Producer";
  const id = useParams().id;
  const [producer, setProducer] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    status: "",
  });
  useEffect(() => {
    const fetchProducer = async () => {
      const producers = await producersApi.edit(id);
      setProducer(producers.data);
    };
    fetchProducer();
  }, []);
  const handleSubmit = () => {
    const data = {
      name: producer.name,
      email: producer.email,
      phone_number: producer.phone_number,
      address: producer.address,
      status: producer.status,
    };
    producersApi
      .update(id, data)
      .then((res) => {
        if (res.data === "Update Producer Success") {
          toast.success("Update Producer Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.error("Connect Server False", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      });
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-10 col-md-10 com-sm-9 col-9">
                <h5>Update Producer</h5>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                <Link
                  to={"#"}
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  <i className="fa fa-save"> Save</i>
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("producer-form")}>
            <div className={cx("nav-producer")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("name-producer")}>
                    <h5>Name Producer</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter the email producer"
                    value={producer.name}
                    onChange={(e) =>
                      setProducer({ ...producer, name: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.name ? (
                    <i className="fa fa-warning">
                      {""} Please provide name producer
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("email-producer")}>
                    <h5>Email Producer</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter the email producer"
                    value={producer.email}
                    onChange={(e) =>
                      setProducer({ ...producer, email: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.email ? (
                    <i className="fa fa-warning">
                      {""} Please provide email producer
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("phone")}>
                    <h5>Phone Number</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Enter the phone number producer"
                    value={producer.phone_number}
                    onChange={(e) =>
                      setProducer({ ...producer, phone_number: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.phone_number ? (
                    <i className="fa fa-warning">
                      {""} Please provide phone number producer
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("adress")}>
                    <h5>Adress</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter the adress producer"
                    value={producer.address}
                    onChange={(e) =>
                      setProducer({ ...producer, address: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.address ? (
                    <i className="fa fa-warning">
                      {""} Please provide address producer
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("adress")}>
                    <h5>Status</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <select
                    name="status"
                    id="status"
                    value={producer.status}
                    onChange={(e) =>
                      setProducer({ ...producer, status: e.target.value })
                    }
                  >
                    <option value="Providing">Providing</option>
                    <option value="Stop-Providing">Stop-Providing</option>
                  </select>
                </div>
                <div className={cx("errors")}>
                  {!producer.address ? (
                    <i className="fa fa-warning">
                      {""} Please provide address producer
                    </i>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProducers;
