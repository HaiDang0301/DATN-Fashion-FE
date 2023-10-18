import { useParams, Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import productsAPI from "../../../api/User/productsAPI";
const cx = classNames.bind(styles);
function ProductDetail() {
  const slug = useParams().slug;
  const titleslug = useParams().slug.split("-").join(" ");
  document.title = `${titleslug} - FASHION`;
  const type = useParams().type;
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await productsAPI.show(slug);
      setProduct(result.data);
    };
    fetchProduct();
  }, []);
  const handleImage = (url) => {
    setImage(url);
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
                    <div className="col-lg-3">
                      <div className={cx("btn-size")}>
                        {product.sizes
                          ? product.sizes.map((item, index) =>
                              console.log(item)
                            )
                          : null}
                      </div>
                    </div>
                  </div>
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
