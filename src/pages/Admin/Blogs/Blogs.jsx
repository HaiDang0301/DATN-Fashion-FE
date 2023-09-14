import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import className from "classnames/bind";
import styles from "./Blogs.module.scss";
const cx = className.bind(styles);
import routesConfig from "../../../config/routes";
function AdminBlogs() {
  document.title = "Admin | Blogs";
  return (
    <div className={cx("wrapper")}>
      <div className="top-blogs">
        <div className="container">
          <h5>Blogs List</h5>
          <div className="row">
            <div className="col-lg-6 col-md-7 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input type="date" name="bigin" id="bigin" />
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                  <div className={cx("title")}>
                    <label htmlFor="">to</label>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className={cx("search-date")}>
                    <input type="date" name="final" id="final" />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                  <div className={cx("btn-search")}>
                    <Link to={"#"}>
                      <i className="fa fa-search"> Search</i>
                    </Link>
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
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <div className={cx("action")}>
                      <Link to={routesConfig.UpdateBlogs}>
                        <i className="fa fa-edit"></i>
                      </Link>
                      <Link to={"#"}>
                        <i className="fa fa-trash"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogs;
