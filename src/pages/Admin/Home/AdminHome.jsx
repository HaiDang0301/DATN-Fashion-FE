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
function AdminHome() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Import",
        data: [10, 30, 20, 50, 60, 90],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sale",
        data: [20, 40, 60, 30, 20, 10],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data1 = {
    labels,
    datasets: [
      {
        label: "2022",
        data: [1, 3, 4, 5, 7, 2, 100, 56],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "2023",
        data: [199, 24, 424, 30, 183, 83],
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
        text: "Sales Month",
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
  document.title = "Admin | Home";
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("orders")}>
              <i className="fa fa-shopping-cart"></i> Orders
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("sales")}>
              <i className="fa fa-usd"></i> Sales Money
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("revenue")}>
              <i className="fa fa-paypal"></i> Revenue
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div className={cx("yearly-sales")}>
              <i className="fa fa-file"></i> Yearly Sales
            </div>
          </div>
        </div>
        <div className={cx("product-sales")}>
          <div className="row">
            <div className="col-lg-9">
              <Bar data={data1} />
            </div>
            <div className="col-lg-3">
              <div className="row">
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("total-clients")}>
                    Total Clients
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"> 8659</i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("total-user")}>
                    Total Blogs
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"> 8659</i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("unique-visitor")}>
                    Total Products
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"> 8659</i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-3 col-sm-6 col-12">
                  <div className={cx("bounce-rate")}>
                    Bounce Rate
                    <div className={cx("stonk")}>
                      <i className="fa fa-signal"> 8659</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("comment")}>
          <div className={cx("title")}>
            <h5>Preview Comment</h5>
          </div>
          <Slider {...settings}>
            <div className={cx("preview-comments")}>
              <Link to={""}>
                <div className={cx("thumnal-container")}>
                  <div className={cx("image-user")}>
                    <img
                      src="https://res.cloudinary.com/dfszyazkj/image/upload/v1699265028/avatar/user/zjjrbxlqr3552gdcziqj.png"
                      alt=""
                    ></img>
                  </div>
                  <div className={cx("user-name")}>
                    <span>User Name</span>
                  </div>
                  <div className={cx("comment")}>
                    <span>Comments</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className={cx("preview-comments")}>
              <Link to={""}>
                <div className={cx("thumnal-container")}>
                  <div className={cx("image-user")}>
                    <img
                      src="https://res.cloudinary.com/dfszyazkj/image/upload/v1699265028/avatar/user/zjjrbxlqr3552gdcziqj.png"
                      alt=""
                    ></img>
                  </div>
                  <div className={cx("user-name")}>
                    <span>User Name</span>
                  </div>
                  <div className={cx("comment")}>
                    <span>Comments</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className={cx("preview-comments")}>
              <Link to={""}>
                <div className={cx("thumnal-container")}>
                  <div className={cx("image-user")}>
                    <img
                      src="https://res.cloudinary.com/dfszyazkj/image/upload/v1699265028/avatar/user/zjjrbxlqr3552gdcziqj.png"
                      alt=""
                    ></img>
                  </div>
                  <div className={cx("user-name")}>
                    <span>User Name</span>
                  </div>
                  <div className={cx("comment")}>
                    <span>Comments</span>
                  </div>
                </div>
              </Link>
            </div>{" "}
            <div className={cx("preview-comments")}>
              <Link to={""}>
                <div className={cx("thumnal-container")}>
                  <div className={cx("image-user")}>
                    <img
                      src="https://res.cloudinary.com/dfszyazkj/image/upload/v1699265028/avatar/user/zjjrbxlqr3552gdcziqj.png"
                      alt=""
                    ></img>
                  </div>
                  <div className={cx("user-name")}>
                    <span>User Name</span>
                  </div>
                  <div className={cx("comment")}>
                    <span>Comments</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className={cx("preview-comments")}>
              <Link to={""}>
                <div className={cx("thumnal-container")}>
                  <div className={cx("image-user")}>
                    <img
                      src="https://res.cloudinary.com/dfszyazkj/image/upload/v1699265028/avatar/user/zjjrbxlqr3552gdcziqj.png"
                      alt=""
                    ></img>
                  </div>
                  <div className={cx("user-name")}>
                    <span>User Name</span>
                  </div>
                  <div className={cx("comment")}>
                    <span>Comments</span>
                  </div>
                </div>
              </Link>
            </div>
          </Slider>
        </div>
        <div className={cx("yearsales")}>
          <Line options={options} data={data} className={cx("chart")} />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
