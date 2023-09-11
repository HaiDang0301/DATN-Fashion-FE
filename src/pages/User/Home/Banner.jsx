import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import test1 from "../../../assets/test1.jpg";
import test2 from "../../../assets/test2.jpg";
import test3 from "../../../assets/test3.jpg";
import test4 from "../../../assets/test4.jpg";
import test5 from "../../../assets/test5.jpg";
const cx = classNames.bind(styles);
function Banner(props) {
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ borderRadius: "30px", background: "#958f8f" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    speed: 2500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner-banner")}>
        <div className="row">
          <div className={cx(props.imgleft ? "col-lg-3" : "null")}>
            <div className={cx("banner")}>
              <img src={props.imgleft} alt="" />
            </div>
          </div>
          <div className="col-lg-9">
            <div className={cx("text")}>
              <div className={cx("nav")}>
                <div className={cx("title")}>
                  {props.item
                    ? props.item.map((i, index) => (
                        <div key={index} className={cx("main-title")}>
                          <Link to={"/"}>
                            <p>{i.title}</p>
                          </Link>
                        </div>
                      ))
                    : null}
                </div>
                <div className={cx("carousel")}>
                  <div className={cx("item")}>
                    <Slider {...settings}>
                      <div className={cx("img")}>
                        <Link to={"/"}>
                          <img src={test1} alt="" />
                        </Link>
                      </div>
                      <div className={cx("img")}>
                        <Link to={"/"}>
                          <img src={test2} alt="" />
                        </Link>
                      </div>
                      <div className={cx("img")}>
                        <Link to={"/"}>
                          <img src={test3} alt="" />
                        </Link>
                      </div>
                      <div className={cx("img")}>
                        <Link to={"/"}>
                          <img src={test4} alt="" />
                        </Link>
                      </div>
                      <div className={cx("img")}>
                        <Link to={"/"}>
                          <img src={test5} alt="" />
                        </Link>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(props.imgright ? "col-lg-3" : "null")}>
            <div className={cx("banner")}>
              <img src={props.imgright} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Banner;
