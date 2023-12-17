import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import blogAPI from "../../../api/Admin/blogsAPI";
import className from "classnames/bind";
import styles from "./Blogs.module.scss";
import formatDate from "../../../formatDate/formatDate";
const cx = className.bind(styles);
function AdminBlogs() {
  document.title = "Admin | Quản lý bài viết";
  const date = new Date();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState("");
  const [begin, setBegin] = useState("");
  const [final, setFinal] = useState("");
  const [show, setShow] = useState(false);
  const [background, setBackground] = useState();
  const handleClose = () => setShow(false);
  const params = searchParams;
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogAPI.index(params);
      setBlogs(blogs.data);
    };
    fetchBlogs();
  }, [show, params]);
  const handleDelete = async () => {
    await blogAPI.delete(id).then((res) => {
      if (res.status === 200) {
        toast.success("Xóa bài viết thành công", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      if (res.status === 404) {
        toast.error("Không tìm thấy bài viết", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      setShow(false);
    });
  };
  const handleSearch = () => {
    if (begin && final) {
      setSearchParams({
        begin: begin,
        final: final,
      });
    }
  };
  const handlePage = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const handleWeek = (week) => {
    setBackground(week);
    const lastWeek = formatDate(
      date.getFullYear() +
        "-" +
        0 +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() -
        7
    );
    const now = formatDate(
      date.getFullYear() +
        "-" +
        0 +
        (date.getMonth() + 1) +
        "-" +
        date.getDate()
    );
    setFinal(now);
    setBegin(lastWeek);
  };
  const handleMonth = (month) => {
    setBackground(month);
    const finalMonth = formatDate(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + 30
    );
    const beginMonth = formatDate(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + 0 + 1
    );
    setFinal(finalMonth);
    setBegin(beginMonth);
  };
  const handleYear = (year) => {
    setBackground(year);
    const finalYear = formatDate(date.getFullYear() + "-" + 12 + "-" + 31);
    const beginYear = formatDate(
      date.getFullYear() + "-" + 0 + 1 + "-" + 0 + 1
    );
    setFinal(finalYear);
    setBegin(beginYear);
  };
  if (!blogs) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>
            <i className="fa fa-warning"> Cảnh Báo</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa bài viết !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="btn btn-danger" onClick={handleDelete}>
            Xác Nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={cx("blogs")}>
        <div className="container-fluid">
          <h5>Danh Sách Bài Viết</h5>
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className={cx("search-date")}>
                    <input
                      type="date"
                      name="bigin"
                      id="bigin"
                      value={begin}
                      onChange={(e) => setBegin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-12">
                  <div className={cx("title")}>
                    <span htmlFor="">đến</span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className={cx("search-date")}>
                    <input
                      type="date"
                      name="final"
                      id="final"
                      value={final}
                      onChange={(e) => setFinal(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                  <div className={cx("btn-search")}>
                    <button className="btn btn-primary" onClick={handleSearch}>
                      <i className="fa fa-search"> Tìm Kiếm</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="row g-0">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item")}>
                    <button
                      className={cx(
                        background === "week" ? "click-button" : "button"
                      )}
                      onClick={(e) => handleWeek("week")}
                    >
                      Tuần
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item")}>
                    <button
                      className={cx(
                        background === "month" ? "click-button" : "button"
                      )}
                      onClick={(e) => handleMonth("month")}
                    >
                      Tháng
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item")}>
                    <button
                      className={cx(
                        background === "year" ? "click-button" : "button"
                      )}
                      onClick={(e) => handleYear("year")}
                    >
                      Năm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-12">
              <div className={cx("create-blogs")}>
                <Link to={routesConfig.CreateBlogs} className="btn btn-primary">
                  Tạo mới
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("table-blogs")}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tiêu Đề</th>
                  <th>Hình Ảnh</th>
                  <th>Tác Giả</th>
                  <th>Từ Khóa</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              {blogs.blogs
                ? blogs.blogs.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>
                          <div className={cx("image")}>
                            <img src={item.image} alt="" />
                          </div>
                        </td>
                        <td>{item.author}</td>
                        <td>{item.hashtag}</td>
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
              pageCount={blogs.totalPage || 1}
              previousLabel="<"
              forcePage={searchParams.get("page") - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogs;
