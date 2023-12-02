import Table from "react-bootstrap/Table";
import classNames from "classnames/bind";
import styles from "./Statistical.module.scss";
const cx = classNames.bind(styles);
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import formatDate from "../../../formatDate/formatDate";
import ReactPaginate from "react-paginate";
import statisticalApi from "../../../api/Admin/statisticalAPI";
function Statistical() {
  document.title = "Admin | Statistical";
  const [data, setData] = useState();
  const [money, setMoney] = useState();
  const [years, setYears] = useState([]);
  const [year, setYear] = useState();
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState();
  const [date, setDate] = useState("");
  const [disable, setDisable] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams;
  useEffect(() => {
    let sum = 0;
    const fetchDate = async () => {
      const result = await statisticalApi.getDate();
      setYears(result.data);
    };
    const fetchWareHouse = async () => {
      const result = await statisticalApi.index(query);
      setData(result.data);
      if (result) {
        result.data.dataWareHouse.months.map((data) => {
          sum += data.sales_Money;
        });
        setMoney(sum);
      }
    };
    fetchDate();
    fetchWareHouse();
  }, [query]);
  const handlePage = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const handleSort = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("type", e.target.value);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const changeYears = async (e) => {
    const value = e.target.value;
    const query = { year: value };
    const result = await statisticalApi.getDate(query);
    setMonths(result.data);
    setYear(value);
    setDisable(false);
    if (value === "") {
      setMonths("");
      setDisable(true);
    }
  };
  const handleSearch = () => {
    setSearchParams({
      year: year,
      month: month,
    });
    setDisable(true);
    setDate(year + "-" + month);
  };
  if (!data) return null;
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className={cx("heading")}>
          <div className="row">
            <div className="col-lg-3">
              <h5>
                <i className="fa fa-usd"> Thống kê và xuất nhập hàng</i>
              </h5>
            </div>
            <div className="col-lg-9">
              <div className={cx("search")}>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="row">
                      <div className="col-lg-4">Năm</div>
                      <div className="col-lg-8">
                        <div className={cx("years")}>
                          <select
                            name="year"
                            id="year"
                            onChange={(e) => changeYears(e)}
                          >
                            <option value=""></option>
                            {years
                              ? years.map((year, index) => (
                                  <option value={year.years} key={index}>
                                    {year.years}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="row">
                      <div className="col-lg-4">Tháng</div>
                      <div className="col-lg-8">
                        <div className={cx("month")}>
                          <select
                            name="month"
                            id="month"
                            onChange={(e) => setMonth(e.target.value)}
                            disabled={disable}
                          >
                            <option value=""></option>
                            {months[0] && months[0].months
                              ? months[0].months.map((month, index) => (
                                  <option value={month.month} key={index}>
                                    {month.month}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className={cx("btn-search")}>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleSearch()}
                      >
                        <i className="fa fa-search"> Tìm Kiếm</i>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className={cx("status-products")}>
                      <select
                        name="sort"
                        id="sort"
                        onChange={(e) => handleSort(e)}
                      >
                        <option value=""></option>
                        <option value="import">Nhập vào</option>
                        <option value="sale">Bán ra</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("content")}>
          <div className="row">
            <div className="col-lg-3">
              <div className={cx("date")}>
                <i className="fa fa-clock-o"></i>
                <label>
                  {date ? date : formatDate(Date.now()).slice(0, 7)}
                </label>
              </div>
            </div>
            <div className="col-lg-3">
              <div className={cx("annual-revenue")}>
                <div className={cx("content")}>
                  <div className={cx("text")}>
                    <i className="fa fa-usd"></i>
                    <label>Doanh thu năm</label>
                  </div>
                  <div className={cx("annual-money")}>{money}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className={cx("total-money")}>
                <div className={cx("content")}>
                  <div className={cx("text")}>
                    <i className="fa fa-money"></i>
                    <label>Tiền nhập hàng</label>
                  </div>
                  <div className={cx("import-money")}>
                    ${Number(data.findMonth[0].import_Money).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className={cx("total-sale")}>
                <div className={cx("content")}>
                  <div className={cx("text")}>
                    <i className="fa fa-shopping-cart"></i>
                    <label>Doanh thu tháng</label>
                  </div>
                  <div className={cx("sales-money")}>
                    {data.findMonth[0].sales_Money}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("table-contents")}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Sản Phẩm</th>
                <th>Kích Thước</th>
                <th>Số Lượng</th>
                <th>Giá</th>
                <td>Ngày</td>
                <th>Loại</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.paginateData.data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.product_name}</td>
                      <td>
                        {item.sizes.map((size, index) => (
                          <li key={index}>{size.size}</li>
                        ))}
                      </td>
                      <td>
                        {item.sizes.map((quantity, index) => (
                          <li key={index}>{quantity.quantity}</li>
                        ))}
                      </td>
                      <td>{item.price}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{item.type === 0 ? "Nhập" : "Xuất"}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
        <div className={cx("panigate")}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePage}
            pageCount={data.paginateData.totalPages || 1}
            previousLabel="<"
            forcePage={searchParams.get("page") - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default Statistical;
