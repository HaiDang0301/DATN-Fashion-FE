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
  document.title = "Admin | Blogs";
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
      const blogs = await blogAPI.getAll(params);
      setBlogs(blogs.data);
    };
    fetchBlogs();
  }, [show, params]);
  const handleDelete = async () => {
    const deleteBlog = await blogAPI.deleteBlog(id).then((res) => {
      if (res.data === "Delete Success") {
        toast.success("Delete Blog Success", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      if (res.status === 404) {
        toast.error("Can't Find Blogs", {
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
        (date.getDate() - 7)
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
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
    const beginMonth = formatDate(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + 0 + 1
    );
    console.log(beginMonth);
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
            <i className="fa fa-warning"> Notification</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your blog !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="btn btn-danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={cx("blogs")}>
        <div className="container">
          <h5>Blogs List</h5>
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
                    <label htmlFor="">to</label>
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
                      <i className="fa fa-search"> Search</i>
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
                      Week
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
                      Month
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
                      Year
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-12">
              <div className={cx("create-blogs")}>
                <Link to={routesConfig.CreateBlogs} className="btn btn-primary">
                  Create
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("table-blogs")}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Author</th>
                  <th>Action</th>
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
