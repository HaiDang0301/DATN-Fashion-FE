import { Link, useSearchParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import blogAPI from "../../../api/blogsAPI";
import className from "classnames/bind";
import styles from "./Blogs.module.scss";
const cx = className.bind(styles);
function AdminBlogs() {
  document.title = "Admin | Blogs";
  let [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState("");
  const [begin, setBegin] = useState("");
  const [final, setFinal] = useState("");
  const [show, setShow] = useState(false);
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
      <div className="top-blogs">
        <div className="container">
          <h5>Blogs List</h5>
          <div className="row">
            <div className="col-lg-6 col-md-7 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input
                      type="date"
                      name="bigin"
                      id="bigin"
                      onChange={(e) => setBegin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                  <div className={cx("title")}>
                    <label htmlFor="">to</label>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input
                      type="date"
                      name="final"
                      id="final"
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
            <div className="col-lg-4 col-md-3 col-sm-12 col-12">
              <div className="row g-0">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item")}>
                    <button>Week</button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item")}>
                    <button>Month</button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("item1")}>
                    <button>Precious</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-12">
              <div className={cx("create-blogs")}>
                <Link to={routesConfig.CreateBlogs} className="btn btn-primary">
                  Create Blogs
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
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogs;
