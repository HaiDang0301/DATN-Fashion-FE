import ReactPaginate from "react-paginate";
import Parser from "html-react-parser";
import { Link, useSearchParams } from "react-router-dom";
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
    const destroy = await bannerApi.delete(id).then((res) => {
      if (res.data === "Delete Banner Success") {
        toast.success("Delete Banner Success", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      if (res.status === 404) {
        toast.error("Can't Find Producer", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      setShow(false);
    });
  };
  const handlePage = (e) => {
    const newPage = e.selected + 1;
    setSearchParams({
      page: newPage,
    });
  };
  if (!banners) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>
            <i className="fa fa-warning"> Notification</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your producer !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="btn btn-danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={cx("banners")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-10 col-9">
              <h5>Banner List</h5>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-3">
              <div className={cx("create-banners")}>
                <Link
                  to={routesConfig.CreateBanners}
                  className="btn btn-primary"
                >
                  Create
                </Link>
              </div>
            </div>
            <div className={cx("table-banners")}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
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
