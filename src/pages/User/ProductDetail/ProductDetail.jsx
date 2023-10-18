import { useParams, Link } from "react-router-dom";
import Parser from "html-react-parser";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import productsAPI from "../../../api/User/productsAPI";
import Slider from "react-slick";
const cx = classNames.bind(styles);
function ProductDetail() {
  window.scrollTo({ top: 300, behavior: "smooth" });
  const type = useParams().type;
  const category = useParams().category;
  const slug = useParams().slug;
  const titleslug = useParams().slug.split("-").join(" ");
  document.title = `${titleslug} - FASHION`;
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState();
  const [quantity, setQuantity] = useState(0);
  const [similar, setSmilar] = useState([]);
  let params = "";
  if (type && category) {
    params = `${type}/${category}`;
  }
  if (type && !category) {
    params = `${type}`;
  }
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await productsAPI.show(slug);
      setProduct(result.data);
    };
    const fetchSmilar = async () => {
      const result = await productsAPI.index(params);
      setSmilar(result.data);
    };
    fetchProduct();
    fetchSmilar();
  }, [slug]);
  const handleImage = (url) => {
    setImage(url);
  };
  const handleMinus = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  console.log(similar);
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
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <div className="container">
          <div className={cx("title-heading")}>
            <Link to={routesConfig.home}>Home</Link> <span> / </span>
            {type ? (
              <>
                <Link to={`/collections/${type}`}>{type}</Link>
                <label htmlFor="">/ {titleslug}</label>
              </>
            ) : (
              <span>{titleslug}</span>
            )}
          </div>
        </div>
      </div>
      <div className={cx("product")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-8">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <div className={cx("thumnail")}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className={cx("list-thumnail-image")}>
                          {product.image
                            ? product.image.map((item, index) => (
                                <Link
                                  to={"#"}
                                  onClick={(e) => handleImage(item.url)}
                                  key={index}
                                >
                                  <img src={item.url} alt="" />
                                </Link>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9">
                  <div className={cx("image")}>
                    {image ? (
                      <img src={image} alt="" />
                    ) : product.image ? (
                      <img src={product.image[0].url} alt="" />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("name-product")}>{product.name}</div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("producer")}>
                    <span>
                      Thương Hiệu :{" "}
                      <Link to={`/collections?producer=${product.producer}`}>
                        {product.producer}
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("product-code")}>
                    <span>Mã Sản phẩm : {product.productCode}</span>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("price")}>
                    {product.old_price != product.price ? (
                      <>
                        <div className={cx("old-price")}>
                          <label>
                            {Number(product.old_price).toLocaleString()}
                          </label>
                          <span>₫</span>
                        </div>
                        <div className={cx("now-price")}>
                          {" "}
                          <label>
                            {Number(product.price).toLocaleString()}
                          </label>
                          <span>₫</span>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label>{Number(product.price).toLocaleString()}</label>
                        <span>₫</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("size")}>
                    <label>Kích Thước</label>
                  </div>
                  <div className="row">
                    {product.sizes
                      ? product.sizes.map((item, index) => (
                          <div className="col-lg-4" key={index}>
                            <div className={cx("btn-size")}>
                              <button>Size {item.size}</button>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("title")}>
                    <label>Màu sắc</label>
                  </div>
                  <div className={cx("color")}>
                    <label
                      htmlFor=""
                      style={{ backgroundColor: `${product.color}` }}
                    >
                      {product.color}
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row g-0">
                    <div className="col-lg-3">
                      <div className={cx("quantity")}>
                        <label>Số Lượng</label>
                      </div>
                    </div>
                    <div className="col-lg-1">
                      <div className={cx("minus")}>
                        <button onClick={handleMinus}>
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className={cx("input-quantity")}>
                        <input
                          type="text"
                          name="quantity"
                          id="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-1">
                      <div className={cx("plus")}>
                        <button onClick={handlePlus}>
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("add-to-cart")}>
                    <button>ADD TO CART</button>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("more-information")}>
                    {product.description ? Parser(product.description) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("similar-product")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4>Similar Product</h4>
            </div>
            <div className="col-lg-12">
              <div className={cx("slider")}>
                <Slider {...settings}>
                  {similar.products
                    ? similar.products.map((item, index) => (
                        <div className={cx("image-smilar")} key={index}>
                          <Link
                            to={
                              params
                                ? `/collections/${params}/products/${item.slug}`
                                : `/collections/products/${item.slug}`
                            }
                          >
                            <img src={item.image[0].url} alt="" />
                            <div className={cx("quick-view")}>View</div>
                          </Link>
                        </div>
                      ))
                    : null}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
