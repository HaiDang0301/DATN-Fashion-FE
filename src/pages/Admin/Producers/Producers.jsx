import producersApi from "../../../api/Admin/producersAPI";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./Producers.module.scss";
const cx = className.bind(styles);
function AdminProducers() {
  document.title = "Admin | Nhà Cung Cấp";
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [producers, setProducers] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState("");
  const handleClose = () => setShow(false);
  const params = searchParams;
  useEffect(() => {
    const fetchProducers = async () => {
      const producers = await producersApi.index(params);
      setProducers(producers.data);
    };
    fetchProducers();
  }, [show, params]);
  const handleDelete = async () => {
    await producersApi.destroy(id).then((res) => {
      if (res.data === "Delete Producer Success") {
        toast.success("Xóa nhà cung cấp thành công", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      if (res.status === 404) {
        toast.error("Không tìm thấy nhà cung cấp", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      setShow(false);
    });
  };
  const handlePage = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const handleSelect = (e) => {
    const search = e.target.value;
    setSelect(search);
  };
  const handleSearch = (e) => {
    setSearchParams({
      status: select,
    });
  };
  if (!producers) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>
            <i className="fa fa-warning"> Cảnh Báo</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa nhà cung cấp !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="btn btn-danger" onClick={handleDelete}>
            Xác Nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={cx("producers")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-5 col-sm-4 col-0">
              <h5>Danh sách nhà cung cấp</h5>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-9">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                  <select
                    name="sort"
                    id="sort"
                    className={cx("select")}
                    onClick={handleSelect}
                  >
                    <option value=""></option>
                    <option value="Providing">Đang Cung Cấp</option>
                    <option value="Stop-Providing">Ngừng Cung Cấp</option>
                  </select>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-3">
              <div className={cx("create-producers")}>
                <Link
                  to={routesConfig.CreateProducers}
                  className="btn btn-primary"
                >
                  Tạo mới
                </Link>
              </div>
            </div>
            <div className={cx("table-producers")}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số Điện Thoại</th>
                    <th>Địa Chỉ</th>
                    <th>Trạng Thái</th>
                    <th>Ngày Ký Hợp Đồng</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                {producers.producers
                  ? producers.producers.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_number}</td>
                          <td>{item.address}</td>
                          <td>{item.status}</td>
                          <td>{item.contract_sign_date.slice(0, 10)}</td>
                          <td>
                            <div className={cx("action")}>
                              <div className={cx("update")}>
                                <Link
                                  to={item._id + "/edit"}
                                  className="btn btn-warning"
                                >
                                  Update
                                </Link>
                              </div>
                              <div className={cx("delete")}>
                                <Link
                                  to={"#"}
                                  onClick={(e) => {
                                    setId(item._id), setShow(true);
                                  }}
                                  className="btn btn-danger"
                                >
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))
                  : null}
              </Table>
            </div>
            <div className={cx("panigate")}>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePage}
                pageCount={producers.totalPage || 1}
                previousLabel="<"
                forcePage={searchParams.get("page") - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducers;
