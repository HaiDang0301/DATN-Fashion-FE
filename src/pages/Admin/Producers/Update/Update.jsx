import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import className from "classnames/bind";
import styles from "./Update.module.scss";
import producersApi from "../../../../api/Admin/producersAPI";
import { useEffect, useState } from "react";
const cx = className.bind(styles);
function UpdateProducers() {
  document.title = "Admin | Cập nhật nhà cung cấp";
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
          toast.success("Cập nhật nhà cung cấp thành công", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.error("Lỗi Server", {
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
                <h5>Cập Nhật Nhà Cung Cấp</h5>
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
                    <h5>Tên Nhà Cung Cấp</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Tên Nhà Cung Cấp"
                    value={producer.name}
                    onChange={(e) =>
                      setProducer({ ...producer, name: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.name ? (
                    <i className="fa fa-warning">
                      {""} Vui lòng cung cấp tên nhà cung cấp
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("email-producer")}>
                    <h5>Email</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email nhà cung cấp"
                    value={producer.email}
                    onChange={(e) =>
                      setProducer({ ...producer, email: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.email ? (
                    <i className="fa fa-warning">
                      {""} Vui lòng cung cấp email nhà cung cấp
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("phone")}>
                    <h5>Số Điện Thoại</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Số Điện Thoại Nhà Cung Cấp"
                    value={producer.phone_number}
                    onChange={(e) =>
                      setProducer({ ...producer, phone_number: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.phone_number ? (
                    <i className="fa fa-warning">
                      {""} Vui lòng cung cấp số điện thoại
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("adress")}>
                    <h5>Địa Chỉ</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Địa chỉ nhà cung cấp"
                    value={producer.address}
                    onChange={(e) =>
                      setProducer({ ...producer, address: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!producer.address ? (
                    <i className="fa fa-warning">
                      {""} Vui lòng cung cấp địa chỉ nhà cung cấp
                    </i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("adress")}>
                    <h5>Trạng Thái</h5>
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
                    <option value="Providing">Đang Cung Cấp</option>
                    <option value="Stop-Providing">Ngừng Cung Cấp</option>
                  </select>
                </div>
                <div className={cx("errors")}>
                  {!producer.address ? (
                    <i className="fa fa-warning">
                      {""} Vui long cung cấp địa chỉ
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
