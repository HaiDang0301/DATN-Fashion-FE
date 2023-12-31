import ReactPaginate from "react-paginate";
import Parser from "html-react-parser";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./Banners.module.scss";
import bannerApi from "../../../api/Admin/bannerAPI";
const cx = className.bind(styles);
function AdminBanners() {
  document.title = "Admin | Banners";
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [banners, setBanners] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const params = searchParams;
  useEffect(() => {
    const fetchBanners = async () => {
      const result = await bannerApi.index();
      setBanners(result.data);
    };
    fetchBanners();
  }, [show, params]);
  const handleDelete = async () => {
    const destroy = await bannerApi
      .delete(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Xóa banner thành công", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setShow(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("Không tìm thấy banner", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handlePage = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  if (!banners) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>
            <i className="fa fa-warning"> Cảnh Báo</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa banner !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="btn btn-danger" onClick={handleDelete}>
            Xác Nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={cx("banners")}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-10 col-9">
              <h5>Danh Sách Banner</h5>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-3">
              <div className={cx("create-banners")}>
                <Link
                  to={routesConfig.CreateBanners}
                  className="btn btn-primary"
                >
                  Tạo mới
                </Link>
              </div>
            </div>
            <div className={cx("table-banners")}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Hình Ảnh</th>
                    <th>Tiêu Đề</th>
                    <th>Mô Tả</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                {banners.banners
                  ? banners.banners.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <img src={item.image} alt="" />
                          </td>
                          <td>{Parser(item.title)}</td>
                          <td>{Parser(item.description)}</td>
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
                pageCount={banners.totalPage || 1}
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

export default AdminBanners;
