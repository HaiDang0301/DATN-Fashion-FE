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
  document.title = "Admin | Quản lý khách hàng";
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-9">
                <h5>
                  <i className="fa fa-users"> Danh sách khách hàng</i>
                </h5>
              </div>
              <div className="col-lg-3">
                <div className={cx("sort")}>
                  <select name="sort" onChange={(e) => handleSort(e)}>
                    <option value="all_clients">Tất cả khách hàng</option>
                    <option value="name_clients">Tên Khách Hàng</option>
                    <option value="not_verify">Tài khoản chưa đăng ký</option>
                    <option value="not_login">
                      Không đăng nhập liên tục trong vòng 1 tháng
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
                    <th>Tên</th>
                    <th>Số Điện Thoại</th>
                    <th>Nhận thông báo</th>
                    <th>Trang thái tài khoản</th>
                    <th>Hình thức đăng nhập</th>
                    <th>Đăng nhập lần cuối</th>
                    <th>Hành Động</th>
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
                            {data.registered ? "Đã đăng ky" : "Chưa đăng ký"}
                          </td>
                          <td>
                            {data.verify ? "Đã xác thực" : "Chưa xác thực"}
                          </td>
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
