import { Link, useSearchParams } from "react-router-dom";
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
const cx = className.bind(styles);
function AdminBlogs() {
  document.title = "Admin | Blogs";
  const date = new Date();
  let [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState("");
  const [begin, setBegin] = useState("");
  const [final, setFinal] = useState("");
  const [show, setShow] = useState(false);
  const [bgweek, setBgweek] = useState(false);
  const [bgmonth, setBgmonth] = useState(false);
  const [bgyear, setBgyear] = useState(false);
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
    const newPage = e.selected + 1;
    if (begin && final) {
      setSearchParams({
        begin: begin,
        final: final,
        page: newPage,
      });
    } else {
      setSearchParams({
        page: newPage,
      });
    }
  };
  const handleWeek = () => {
    setBgweek(true);
    setBgmonth(false);
    setBgyear(false);
    const lastWeek =
      date.getFullYear() +
      "-" +
      0 +
      (date.getMonth() + 1) +
      "-" +
      (date.getDate() - 7);
    const now =
      date.getFullYear() +
      "-" +
      0 +
      (date.getMonth() + 1) +
      "-" +
      date.getDate();
    setFinal(now);
    setBegin(lastWeek);
  };
  const handleMonth = () => {
    setBgmonth(true);
    setBgweek(false);
    setBgyear(false);
    if (
      date.getDate() === 1 ||
      date.getDate() === 3 ||
      date.getDate() === 5 ||
      date.getDate() === 7 ||
      date.getDate() === 8 ||
      date.getDate() === 10 ||
      date.getDate() === 12
    ) {
      const finalMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 31;
      const beginMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 0 + 1;
      setFinal(finalMonth);
      setBegin(beginMonth);
      console.log(finalMonth);
    } else if (date.getDate !== 2) {
      const finalMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 30;
      const beginMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 0 + 1;
      setFinal(finalMonth);
      setBegin(beginMonth);
      console.log(finalMonth);
    }
    if (date.getFullYear() % 4 === 0 && date.getMonth() === 2) {
      const finalMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 29;
      const beginMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 0 + 1;
      setFinal(finalMonth);
      setBegin(beginMonth);
    }
    if (date.getFullYear() % 4 !== 0 && date.getMonth() === 2) {
      const finalMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 28;
      const beginMonth =
        date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 0 + 1;
      setFinal(finalMonth);
      setBegin(beginMonth);
    }
  };
  const handleYear = () => {
    setBgmonth(false);
    setBgweek(false);
    setBgyear(true);
    const finalYear = date.getFullYear() + "-" + 12 + "-" + 31;
    const beginYear = date.getFullYear() + "-" + 0 + 1 + "-" + 0 + 1;
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
                      className={cx(bgweek ? "click-button" : "button")}
                      onClick={handleWeek}
                    >
                      Week
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item")}>
                    <button
                      className={cx(bgmonth ? "click-button" : "button")}
                      onClick={handleMonth}
                    >
                      Month
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item")}>
                    <button
                      className={cx(bgyear ? "click-button" : "button")}
                      onClick={handleYear}
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
