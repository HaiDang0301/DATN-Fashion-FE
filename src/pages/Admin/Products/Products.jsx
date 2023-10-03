import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import routesConfig from "../../../config/routes";
import className from "classnames/bind";
import styles from "./Products.module.scss";
const cx = className.bind(styles);
function AdminProducts() {
  document.title = "Admin | Products";
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className={cx("product-act")}>
          <div className="row g-0">
            <div className="col-lg-2">
              <div className={cx("title")}>
                <h5>Products List</h5>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className={cx("chose-file")}>
                <div className="row">
                  <div className="col-lg-8">
                    <input type="file" name="file" id="file" />
                  </div>
                  <div className="col-lg-4">
                    <button className="btn btn-primary">Import</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className={cx("download-file")}>
                <button className="btn btn-primary">Download File</button>
              </div>
            </div>
            <div className="col-lg-2">
              <div className={cx("create-product")}>
                <Link
                  to={routesConfig.CreateProducts}
                  className="btn btn-primary"
                >
                  Create Products
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("sort")}>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <div className={cx("status")}>
                  <select name="" id="">
                    <option value="">Are Trading</option>
                    <option value="">Stopped Trading</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className={cx("category")}>
                  <select name="" id="">
                    <option value="">Shoes</option>
                    <option value="">Hat</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className={cx("brand")}>
                  <select name="" id="">
                    <option value="">Gucci</option>
                    <option value="">Chanel</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className={cx("search")}>
                  <button className="btn btn-primary">
                    <i className="fa fa-search"> Search </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("table-products")}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>STT</th>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Import Price</th>
                <th>Sale Price</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <div className={cx("action")}>
                    <Link to={routesConfig.UpdateProducts}>
                      <i className="fa fa-edit"></i>
                    </Link>
                    <Link>
                      <i className="fa fa-trash"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className={cx("total-product")}>
          <label htmlFor="total-product">
            Total products / Manufacturer Quantity
          </label>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
