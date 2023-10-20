import classNames from "classnames/bind";
import loading from "../../../assets/loading.gif";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import Carousel from "react-bootstrap/Carousel";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import bannerApi from "../../../api/Admin/bannerAPI";
import homeAPI from "../../../api/User/homeApi";
import blogAPI from "../../../api/User/blogsAPI";
import formatDate from "../../../formatDate/formatDate";
const cx = classNames.bind(styles);
function Home() {
  document.title = "Home";
  const [banner, setBanner] = useState([]);
  const [collection, setCollection] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchBanner();
    fetchCollection();
    fetchNewProduct();
    fetchSpicialProduct();
    fetchBlogs();
  }, []);
  const fetchBanner = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    const result = await bannerApi.index();
    setBanner(result.data);
  };
  const fetchCollection = async () => {
    const result = await homeAPI.showCollection();
    setCollection(result.data);
  };
  const fetchNewProduct = async () => {
    const result = await homeAPI.newProduct();
    setNewProduct(result.data);
  };
  const fetchSpicialProduct = async () => {
    const result = await homeAPI.special();
    setSpecialProducts(result.data);
  };
  const fetchBlogs = async () => {
    const result = await blogAPI.getAll();
    setBlogs(result.data);
  };
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          background: "#958f8f",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
  const settingBlogs = {
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        {isLoading ? (
          <div className={cx("isLoading")}>
            <img src={loading} alt="" />
          </div>
        ) : (
          <Carousel
            data-bs-theme="dark"
            indicators={false}
            fade={true}
            slide={true}
          >
            {banner.banners
              ? banner.banners.map((item, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={item.image}
                      alt="First slide"
                    />
                    {index % 2 == 0 ? (
                      <Carousel.Caption className={cx("caption-right")}>
                        <div className={cx("title")}>
                          <h1>{item.title}</h1>
                          <label>{Parser(item.description)}</label>
                          <Link to={"/collections"} className="btn btn-primary">
                            Shop now
                          </Link>
                        </div>
                      </Carousel.Caption>
                    ) : (
                      <Carousel.Caption className={cx("caption-left")}>
                        <div className={cx("title")}>
                          <h1>{item.title}</h1>
                          <label>{Parser(item.description)}</label>
                          <Link to={"/collections"} className="btn btn-primary">
                            Shop now
                          </Link>
                        </div>
                      </Carousel.Caption>
                    )}
                  </Carousel.Item>
                ))
              : null}
          </Carousel>
        )}
      </div>
      <div className={cx("row-cat")}>
        <div className="container">
          <div className="row">
            {collection
              ? collection.map((item, index) => (
                  <div
                    className={cx(
                      `col-lg-${12 / collection.length} col-md-${
                        12 / collection.length
                      } col-md-${12 / collection.length}`
                    )}
                    key={index}
                  >
                    <div className={cx("collection-show")}>
                      <Link to={`/collections/${item.collections}`}>
                        <img src={item.image} alt="" />
                      </Link>
                      <div className={cx("text-collection")}>
                        <h1>{item.collections}</h1>
                        <h5>Collections</h5>
                        <div className={cx("action")}>
                          <Link to={`/collections/${item.collections}`}>
                            Shop Now <i className="fa fa-long-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <div className={cx("new-products")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={cx("title-heading")}>
                <h3>New Products</h3>
                <hr />
              </div>
            </div>
            <div className="col-lg-12">
              <Slider {...settings}>
                {newProduct
                  ? newProduct.map((item, index) => (
                      <div className={cx("product-item")} key={index}>
                        <Link
                          to={`/collections/new-products/products/${item.slug}`}
                        >
                          <div className={cx("thumnal-container")}>
                            <div className={cx("image-product")}>
                              {item.image[0] ? (
                                <img src={item.image[0].url} alt="" />
                              ) : (
                                <img
                                  src="https://s2s.co.th/wp-content/uploads/2019/09/photo-icon-Copy-7.jpg"
                                  alt=""
                                />
                              )}
                              <div className={cx("quick-view")}>
                                <span>View</span>
                              </div>
                            </div>
                            <div className={cx("product-flag")}>
                              <span>NEW</span>
                            </div>
                          </div>
                        </Link>
                        <div className={cx("product-description")}>
                          <div className={cx("name-product")}>{item.name}</div>
                          <div className={cx("price-product")}>
                            $ {Number(item.price).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("attachment")}>
        <div className={cx("title-attachment")}>
          <h1>SAVE IN STYLE</h1>
          <h2>WITH THE DISCOUNT CLOTHING!</h2>
          <Link to={"/collections"} className="btn">
            <span>VIEW COLLECTIONS</span>
          </Link>
        </div>
      </div>
      <div className={cx("special-products")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={cx("title-heading")}>
                <h3>Spicial Products</h3>
                <hr />
              </div>
            </div>
            <div className="col-lg-12">
              <Slider {...settings}>
                {specialProducts
                  ? specialProducts.map((item, index) => (
                      <div className={cx("product-item")} key={index}>
                        <Link to={`/collections/sale/products/${item.slug}`}>
                          <div className={cx("thumnal-container")}>
                            <div className={cx("image-product")}>
                              {item.image[0] ? (
                                <img src={item.image[0].url} alt="" />
                              ) : (
                                <img
                                  src="https://s2s.co.th/wp-content/uploads/2019/09/photo-icon-Copy-7.jpg"
                                  alt=""
                                />
                              )}
                              <div className={cx("quick-view")}>
                                <span>View</span>
                              </div>
                            </div>
                            <div className={cx("product-flag-sale")}>
                              <span>Sale</span>
                            </div>
                            <div className={cx("sale")}>
                              <span>-{item.promotion}%</span>
                            </div>
                          </div>
                        </Link>
                        <div className={cx("product-description")}>
                          <div className={cx("name-product")}>{item.name}</div>
                          <div className={cx("price-product")}>
                            <div className={cx("old-price")}>
                              $ {Number(item.old_price).toLocaleString()}
                            </div>
                            <div className={cx("now-price")}>
                              $ {Number(item.price).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("attachment-1")}>
        <div className={cx("title-attachment")}>
          <h1>BUY THE MOST STYLISH APPAREL</h1>
          <h2>FOR THE WHOLE FAMILY!</h2>
          <Link to={"/collections"} className="btn">
            <span>VIEW COLLECTIONS</span>
          </Link>
        </div>
      </div>
      <div className={cx("blogs")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={cx("title-heading")}>
                <h3>Our Blog</h3>
                <hr />
              </div>
            </div>
            <div className="col-lg-12">
              <Slider {...settingBlogs}>
                {blogs.blogs
                  ? blogs.blogs.map((item, index) => (
                      <div className={cx("blogs-item")} key={index}>
                        <Link to={`/blogs/${item.slug}`}>
                          <div className={cx("image")}>
                            <img src={item.image} />
                          </div>
                        </Link>
                        <div className={cx("title-blog")}>
                          {item.title.slice(0, 50) + ". . ."}
                        </div>
                        <div className={cx("time-update")}>
                          <i className="fa fa-clock-o"></i>{" "}
                          {formatDate(item.createdAt)}
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <i className="fa fa-comment"> 0 comment</i>
                          </div>
                          <div className="col-lg-6">
                            <i className="fa fa-user"></i> {item.author}
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
