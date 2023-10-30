import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Parser from "html-react-parser";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import productsAPI from "../../../api/User/productsAPI";
import Slider from "react-slick";
import cartAPI from "../../../api/User/cartAPI";
import { useDispatch } from "react-redux";
import { resetCart } from "../../../features/AddToCart/AddToCart";
const cx = classNames.bind(styles);
function ProductDetail() {
  const dispatch = useDispatch();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const type = useParams().type;
  const category = useParams().category;
  const slug = useParams().slug;
  const [product, setProduct] = useState([]);
  const [id, setID] = useState();
  document.title = `${product.name} - FASHION`;
  const titleslug = product.name;
  const [image, setImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [similar, setSmilar] = useState([]);
  const [disable, setDisable] = useState(false);
  const [size, setSize] = useState();
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
    window.scrollTo({ top: 300, behavior: "smooth" });
    fetchProduct();
    fetchSmilar();
  }, [slug]);
  const handleImage = (url, id) => {
    setID(id);
    setImage(url);
  };
  const handleMinus = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
      setDisable(false);
    }
  };
  const handleQuantity = (e) => {
    setDisable(false);
    setQuantity(e.target.value);
  };
  const handlePlus = () => {
    setDisable(false);
    setQuantity(quantity + 1);
  };
  const handleSize = (size) => {
    setDisable(false);
    setSize(size);
  };
  const handleAddToCart = async () => {
    if (!token) {
      toast.warning("Please login to use this function", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
      setDisable(true);
    } else {
      if (!size) {
        setDisable(true);
        toast.warning("Please choose the product size", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      if (size && isNaN(quantity)) {
        toast.warning("The quantity must be a number", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
        setDisable(true);
      } else {
        const data = {
          product_id: product._id,
          product_name: product.name,
          image: product.image[0].url,
          size: size,
          quantity: quantity,
          price: product.price,
        };
        await cartAPI
          .store(data)
          .then((res) => {
            if (res.status === 200) {
              const action = resetCart();
              dispatch(action);
              setDisable(true);
              toast.success("Add products to successful shopping cart", {
                position: "bottom-right",
                autoClose: 5000,
                theme: "light",
              });
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              toast.error("Products already in the cart", {
                position: "bottom-right",
                autoClose: 5000,
                theme: "light",
              });
              setDisable(true);
            }
            if (err.response.status === 403) {
              toast.error(
                "The number of products in the warehouse is not enough",
                {
                  position: "bottom-right",
                  autoClose: 5000,
                  theme: "light",
                }
              );
              setDisable(true);
            }
            if (err.response.status === 404) {
              toast.error("Can't Find Product", {
                position: "bottom-right",
                autoClose: 5000,
                theme: "light",
              });
              setDisable(true);
            }
            if (err.response.status === 500) {
              toast.error("Connect Server False", {
                position: "bottom-right",
                autoClose: 5000,
                theme: "light",
              });
              setDisable(true);
            }
          });
      }
    }
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
    slidesToShow: 6,
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
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
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
  const mobile = {
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("heading")}>
        <div className="container">
          <div className={cx("title-heading")}>
            <Link to={routesConfig.home}>Home</Link> <span> / </span>
            {type ? (
              <>
                <Link to={`/collections/${type}`}>{type}</Link>
                <span>/ {titleslug}</span>
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
            <div className="col-lg-8 col-md-7 col-sm-6">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                  <div className={cx("thumnail")}>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className={cx("list-thumnail-image")}>
                          {product.image
                            ? product.image.map((item, index) => (
                                <Link
                                  to={"#"}
                                  onClick={(e) =>
                                    handleImage(item.url, item.public_id)
                                  }
                                  key={index}
                                >
                                  <img
                                    src={item.url}
                                    alt=""
                                    className={cx(
                                      id === item.public_id
                                        ? "box-image"
                                        : "box-none"
                                    )}
                                  />
                                </Link>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={cx("image")}>
                        {image ? (
                          <img src={image} alt="" />
                        ) : product.image ? (
                          <img src={product.image[0].url} alt="" />
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className={cx("thumnail-mobile")}>
                        <Slider {...mobile}>
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
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6">
              <div className={cx("more-information")}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className={cx("name-product")}>{product.name}</div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("producer")}>
                      <span>
                        Trademark :{" "}
                        <Link to={`/collections?producer=${product.producer}`}>
                          {product.producer}
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("product-code")}>
                      <span>Product Code : {product.productCode}</span>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("price")}>
                      {product.promotion > 0 ? (
                        <>
                          <div className={cx("old-price")}>
                            <span>
                              $ {Number(product.old_price).toLocaleString()}
                            </span>
                          </div>
                          <div className={cx("now-price")}>
                            {" "}
                            <span>
                              $ {Number(product.price).toLocaleString()}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div>
                          <span>
                            $ {Number(product.price).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("size")}>
                      <span>Size</span>
                    </div>
                    <div className="row">
                      {product.sizes
                        ? product.sizes.map((item, index) => (
                            <div
                              className="col-lg-4 col-md-6 col-sm-4 col-2"
                              key={index}
                            >
                              <div
                                className={cx(
                                  item.size === size ? "change-bg" : "btn-size"
                                )}
                              >
                                <button onClick={(e) => handleSize(item.size)}>
                                  Size {item.size}
                                </button>
                                <div className={cx("check")}>
                                  <i className="fa fa-check"></i>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("title")}>
                      <span>Color</span>
                    </div>
                    <div className={cx("color")}>
                      <label style={{ backgroundColor: `${product.color}` }}>
                        {product.color}
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row g-0">
                      <div className="col-lg-3 col-md-4 col-sm-5 col-2">
                        <div className={cx("quantity")}>
                          <label>Quantity</label>
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                        <div className={cx("minus")}>
                          <button onClick={handleMinus}>
                            <i className="fa fa-minus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-2">
                        <div className={cx("input-quantity")}>
                          <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => handleQuantity(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                        <div className={cx("plus")}>
                          <button onClick={handlePlus}>
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-12">
                    <div
                      className={cx(
                        disable ? "disable-add-to-cart" : "add-to-cart"
                      )}
                    >
                      <button onClick={handleAddToCart} disabled={disable}>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("description")}>
                      {product.description ? Parser(product.description) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("similar-product")}>
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
                              onClick={(e) => {
                                setImage(null), setSize(null), setQuantity(1);
                              }}
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
    </div>
  );
}

export default ProductDetail;
