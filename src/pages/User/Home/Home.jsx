import { Carousel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import banner1 from "../../../assets/banner-1.png";
import banner2 from "../../../assets/banner-2.png";
import banner3 from "../../../assets/banner-3.jpg";
import banner4 from "../../../assets/banner-4.jpg";
import banner5 from "../../../assets/banner-5.jpg";
import women from "../../../assets/women.jpg";
import man from "../../../assets/man.jpg";
import insta1 from "../../../assets/insta-1.jpg";
import insta2 from "../../../assets/insta-2.jpg";
import insta3 from "../../../assets/insta-3.jpg";
import insta4 from "../../../assets/insta-4.jpg";
import insta5 from "../../../assets/insta-5.jpg";
import insta6 from "../../../assets/insta-6.jpg";
import lt1 from "../../../assets/latest-1.jpg";
import lt2 from "../../../assets/latest-2.jpg";
import lt3 from "../../../assets/latest-3.jpg";
import icon1 from "../../../assets/icon-1.png";
import icon2 from "../../../assets/icon-2.png";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Banner from "./Banner";
const cx = classNames.bind(styles);
function Home() {
  document.title = "Home";
  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        <Carousel
          data-bs-theme="dark"
          indicators={false}
          fade={true}
          slide={true}
        >
          <Carousel.Item>
            <img className="d-block w-100" src={banner1} alt="First slide" />
            <Carousel.Caption className={cx("caption")}>
              <div className={cx("title")}>
                <h1>Black Friday</h1>
                <p>Một số sản phẩm có thể sale off lên đến gần 80-90%.</p>
                <button className="btn btn-primary">Shop now</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={banner2} alt="Second slide" />
            <Carousel.Caption className={cx("caption")}>
              <div className={cx("title")}>
                <h1>Black Friday</h1>
                <p>
                  24/11/2023 là cơ hội mua sắm vàng mà bạn không nên bỏ qua.
                </p>
                <button className="btn btn-primary">Shop now</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className={cx("banner-section")}>
        <div className="row">
          <div className="col-lg-4">
            <div className={cx("single-banner")}>
              <Link to={"/"}>
                <img src={banner3} alt="" />
                <div className={cx("inner-text")}>
                  <p>Men's</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={cx("single-banner")}>
              <Link to={"/"}>
                <img src={banner4} alt="" />
                <div className={cx("inner-text")}>
                  <p>Women's</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={cx("single-banner")}>
              <Link to={"/"}>
                <img src={banner5} alt="" />
                <div className={cx("inner-text")}>
                  <p>Kid's</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Banner
          imgleft={women}
          item={[
            { title: "Clothings", link: "/" },
            {
              title: "Hanbag",
              link: "/",
            },
            {
              title: "Shoes",
              link: "/",
            },
            {
              title: "Accessories",
              link: "/",
            },
          ]}
        ></Banner>
        <div className={cx("bg-time")}>
          <div className={cx("hanbag")}></div>
        </div>
        <Banner
          imgright={man}
          item={[
            { title: "Clothings", link: "/" },
            {
              title: "Hanbag",
              link: "/",
            },
            {
              title: "Shoes",
              link: "/",
            },
            {
              title: "Accessories",
              link: "/",
            },
          ]}
        ></Banner>
      </div>
      <div className={cx("insta-item")}>
        <div className="row">
          <div className="col-sm-6 col-lg-2">
            <img src={insta1} alt="" />
          </div>
          <div className="col-sm-6 col-lg-2">
            <img src={insta2} alt="" />
          </div>
          <div className="col-sm-6 col-lg-2">
            <img src={insta3} alt="" />
          </div>
          <div className="col-sm-6 col-lg-2">
            <img src={insta4} alt="" />
          </div>
          <div className="col-sm-6 col-lg-2">
            <img src={insta5} alt="" />
          </div>
          <div className="col-sm-6 col-lg-2">
            <img src={insta6} alt="" />
          </div>
        </div>
      </div>
      <div className={cx("blog")}>
        <div className={cx("title-blog")}>
          <h1>From The Blog</h1>
          <div className={cx("card")}>
            <div className="row">
              <div className="col-sm-12 col-lg-4">
                <Link to={"/"}>
                  <Card className={cx("item-card")}>
                    <Card.Img variant="top" src={lt1} />
                    <Card.Body>
                      <Card.Title className={cx("card-title")}>
                        The Best Street Style From London Fashion Week
                      </Card.Title>
                      <Card.Text>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
              {/*  */}
              <div className="col-sm-6 col-lg-4">
                <Link to={"/"}>
                  <Card className={cx("item-card")}>
                    <Card.Img variant="top" src={lt2} />
                    <Card.Body>
                      <Card.Title className={cx("card-title")}>
                        Vogue's Ultimate Guide To Autumn/Winter 2019 Shoes
                      </Card.Title>
                      <Card.Text>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
              {/*  */}
              <div className="col-sm-6 col-lg-4">
                <Link to={"/"}>
                  <Card className={cx("item-card")}>
                    <Card.Img variant="top" src={lt3} />
                    <Card.Body>
                      <Card.Title className={cx("card-title")}>
                        How To Brighten Your Wardrobe With A Dash Of Lime
                      </Card.Title>
                      <Card.Text>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("delivery")}>
        <div className={cx("item-delivery")}>
          <div className="row">
            <div className="col-sm-4">
              <div className={cx("item")}>
                <img src={icon1} alt="" />
                <div className={cx("title-delivery")}>
                  <h5>FREE SHIPPING</h5>
                  <p>For all order over 99$</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className={cx("item")}>
                <img src={icon2} alt="" />
                <div className={cx("title-delivery")}>
                  <h5>DELIVERY ON TIME</h5>
                  <p>If good have prolems</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className={cx("item")}>
                <img src={icon1} alt="" />
                <div className={cx("title-delivery")}>
                  <h5>SECURE PAYMENT</h5>
                  <p>100% secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
