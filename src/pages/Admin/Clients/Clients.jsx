import { Table } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import className from "classnames/bind";
import ReactPaginate from "react-paginate";
import styles from "./Clients.module.scss";
import { useEffect, useState } from "react";
import clientAPI from "../../../api/Admin/clientAPI";
import formatDate from "../../../formatDate/formatDate";
const cx = className.bind(styles);
function Clients() {
  document.title = "Admin | Clients";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams;
  const [clients, setClients] = useState();
  useEffect(() => {
    const fetchClients = async () => {
      const result = await clientAPI.index(query);
      setClients(result.data);
    };
    fetchClients();
  }, [query]);
  const handlePage = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const handleSort = (e) => {
    const query = e.target.value;
    setSearchParams({
      q: query,
    });
  };
  if (!clients) return null;
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
                  <select name="sort" onChange={(e) => handleSort(e)}>
                    <option value="all_clients">All Clients</option>
                    <option value="name_clients">Name Clients</option>
                    <option value="not_verify">
                      The account is not authenticated
                    </option>
                    <option value="not_login">
                      Do not log in continuously for a month
                    </option>
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
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Register NEWSLETTER</th>
                    <th>Status Verify</th>
                    <th>Auth Type</th>
                    <th>Last Time Login</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients
                    ? clients.clients.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.full_name}</td>
                          <td>{data.phone}</td>
                          <td>
                            {data.registered ? "Registered" : "Unregistered"}
                          </td>
                          <td>{data.verify ? "Verify" : "Unverify"}</td>
                          <td>{data.authType}</td>
                          <td>{formatDate(data.last_time_login)}</td>
                          <td>
                            <div className={cx("action-Clients")}>
                              {data.verify === false ||
                              query.get("q") === "not_login" ? (
                                <Link to={"#"}>
                                  <h5>
                                    <i className="fa fa-trash"></i>
                                  </h5>
                                </Link>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </div>
          </div>
          <div className={cx("panigate")}>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePage}
              pageCount={clients.totalPage || 1}
              previousLabel="<"
              forcePage={searchParams.get("page") - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
