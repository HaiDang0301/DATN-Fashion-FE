import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import styles from "./Clients.module.scss";
const cx = className.bind(styles);
function Clients() {
  document.title = "Admin | Clients";
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-9">
                <h5>
                  <i className="fa fa-users"> Clients</i>
                </h5>
              </div>
              <div className="col-lg-3">
                <div className={cx("sort")}>
                  <select name="sort" id="">
                    <option value="">Default</option>
                    <option value="">Name Clients</option>
                    <option value="">Customers buy the most</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className={cx("table-clients")}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Code Clients</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Last purchase</th>
                    <th>Total money</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>
                      <div className={cx("action-Clients")}>
                        <Link to={"#"}>
                          <h5>
                            <i className="fa fa-trash"></i>
                          </h5>
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
    </div>
  );
}

export default Clients;
