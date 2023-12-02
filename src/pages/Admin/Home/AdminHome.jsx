import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Slider from "react-slick";
const cx = classNames.bind(styles);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import clientAPI from "../../../api/Admin/clientAPI";
import producersApi from "../../../api/Admin/producersAPI";
import productsAPI from "../../../api/Admin/productsAPI";
import blogAPI from "../../../api/Admin/blogsAPI";
import ordersAPI from "../../../api/Admin/ordersAPI";
import statisticalApi from "../../../api/Admin/statisticalAPI";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
var arrMonths = [];
var arrMoney = [];
var arrMoneyLastYear = [];
var arrData = [];
var arrType0 = [];
var sumImport = 0;
var arrLenghtType0 = [];
var arrType1 = [];
var sumSale = 0;
var arrLenghtType1 = [];
function AdminHome() {
  const [orders, setOrders] = useState([]);
  const [wareHouse, setWareHouse] = useState();
  const [money, setMoney] = useState();
  const [clients, setClients] = useState([]);
  const [producers, setProducers] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const query = { year: new Date().getFullYear() - 1 };
  let sum = 0;
  const labels = arrMonths;
  const dataMonth = {
    labels,
    datasets: [
      {
        label: "Nhập Vào",
        data: arrLenghtType0,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Bán Ra",
        data: arrLenghtType1,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataYear = {
    labels,
    datasets: [
      {
        label: new Date().getFullYear() - 1,
        data: arrMoneyLastYear,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: new Date().getFullYear(),
        data: arrMoney,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê nhập xuất hàng",
      },
    },
  };
  const settings = {
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          nextArrow: false,
          prevArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
  };
  document.title = "Admin | Trang Chủ";
  useEffect(() => {
    const fetchOrders = async () => {
      const reusult = await ordersAPI.index();
      setOrders(reusult.data);
    };
    const fetchWareHouse = async () => {
      const result = await statisticalApi.index();
      setWareHouse(result.data);
      if (result) {
        result.data.dataWareHouse.months.map((data) => {
          sum += data.sales_Money;
        });
        setMoney(sum);
      }
    };
    const fetchYear = async () => {
      const result = await statisticalApi.getDate();
      if (result) {
        result.data[0].months.map((data) => {
          arrMonths.push(data.month);
          arrMoney.push(data.sales_Money);
        });
      }
    };
    const fetchLastYear = async () => {
      const result = await statisticalApi.getDate(query);
      if (result) {
        result.data[0].months.map((data) => {
          arrMoneyLastYear.push(data.sales_Money);
        });
      }
    };
    const fetchClients = async () => {
      const reusult = await clientAPI.index();
      setClients(reusult.data);
    };
    const fetchProducers = async () => {
      const reusult = await producersApi.index();
      setProducers(reusult.data);
    };
    const fetchProducts = async () => {
      const reusult = await productsAPI.index();
      setProducts(reusult.data);
    };
    const fetchBlogs = async () => {
      const reusult = await blogAPI.index();
      setBlogs(reusult.data);
    };
    const fetchImport = async () => {
      const result = await statisticalApi.index();
      if (result) {
        result.data.dataWareHouse.months.map((data) => {
          arrData.push(data.data);
          arrData.filter((item) => {
            arrType0 = item.filter((type) => {
              return type.type === 0;
            });
            arrType1 = item.filter((type) => {
              return type.type === 1;
            });
          });
          arrType0.forEach((item) => {
            item.sizes.forEach((quantity) => {
              sumImport += quantity.quantity;
            });
          });
          arrLenghtType0.push(sumImport);
          sumImport = 0;
          arrType1.map((item) => {
            item.sizes.map((quantity) => {
              sumSale += quantity.quantity;
            });
          });
          arrLenghtType1.push(sumSale);
          sumSale = 0;
        });
      }
    };
    fetchOrders();
    fetchWareHouse();
    fetchYear();
    fetchLastYear();
    fetchClients();
    fetchProducers();
    fetchProducts();
    fetchBlogs();
    fetchImport();
  }, []);
  if (!wareHouse) return null;
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("orders")}>
              <div className={cx("content")}>
                <div className={cx("text")}>
                  <i className="fa fa-shopping-cart"></i>{" "}
                  <label>Tổng Đơn Hàng</label>
                </div>
                <div className={cx("total-number")}>
                  {orders && orders.countOrders ? orders.countOrders : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("sales")}>
              <i className="fa fa-usd"></i> Tổng Tiền Nhập Hàng
              <div className={cx("import-money")}>
                {Number(wareHouse.findMonth[0].import_Money).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("revenue")}>
              <i className="fa fa-paypal"> Doanh Thu Tháng</i>
              <div className={cx("sales-money")}>
                {wareHouse.findMonth[0].sales_Money}
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("yearly-sales")}>
              <i className="fa fa-money"> Doanh Thu Năm</i>
              <div className={cx("annual-money")}>{money}</div>
            </div>
          </div>
        </div>
        <div className={cx("product-sales")}>
          <div className="row">
            <div className="col-lg-9">
              <Bar data={dataYear} />
            </div>
            <div className="col-lg-3">
              <div className="row">
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("total-clients")}>
                    Tổng Khách Hàng
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"></i>{" "}
                      {clients ? clients.countClients : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("total-producers")}>
                    Tổng Nhà Cung Cấp
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"></i>{" "}
                      {producers && producers.countProducers
                        ? producers.countProducers
                        : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("unique-visitor")}>
                    Tổng Sản Phẩm
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"></i>{" "}
                      {products && products.countProducts
                        ? products.countProducts
                        : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("total-user")}>
                    Tổng Bài Viết
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"></i>{" "}
                      {blogs && blogs.countBlogs ? blogs.countBlogs : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("yearsales")}>
          <Line options={options} data={dataMonth} className={cx("chart")} />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
