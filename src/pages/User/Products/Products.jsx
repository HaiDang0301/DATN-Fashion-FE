import { Link } from "react-router-dom";
import col from "../../../assets/col.jpg";
import grid from "../../../assets/grid.jpg";
import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import routesConfig from "../../../config/routes";
import { useState } from "react";
const cx = classNames.bind(styles);
function Products() {
  document.title = "Collections";
  const [grids, setGrids] = useState(false);
  console.log(grids);
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4 col-12">
            <div className={cx("menu-left")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("price")}>
                    <ul>
                      <li>
                        <h5>Price</h5>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("manufacturer")}>
                    <ul>
                      <li>
                        <h5>Manufacturer</h5>
                        <ul>
                          <li>Adidas</li>
                          <li>Gucci</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("collections")}>
                    <ul>
                      <li>
                        <h5>Collections</h5>
                        <ul>
                          <li>Men</li>
                          <li>Men</li>
                          <li>Men</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("category")}>
                    <ul>
                      <li>
                        <h5>Category</h5>
                        <ul>
                          <li>Men</li>
                          <li>Men</li>
                          <li>Men</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("color")}>
                    <ul>
                      <li>
                        <h5>Color</h5>
                        <ul>
                          <li>
                            <Link>
                              <label
                                htmlFor=""
                                style={{ backgroundColor: "red" }}
                              >
                                <span></span>
                              </label>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-12">
            <div className={cx("products")}>
              <div className="row">
                <div className="col-lg-12">
                  <label htmlFor="">
                    <Link to={routesConfig.home}>Home </Link>{" "}
                    <i className="fa fa-long-arrow-right"></i>{" "}
                    <Link to={"/collections"}>Collection</Link>
                  </label>
                </div>
                <div className="col-lg-12">
                  <div className={cx("title")}>
                    <h5>Collection</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("tool-bar")}>
                    <div className={cx("quick-access")}>
                      <div className="row">
                        <div className="col-lg-10 col-md-9 col-sm-8 col-8">
                          {" "}
                          6 items
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                              Show
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                              <select name="" id="">
                                <option value="9">9</option>
                                <option value="9">15</option>
                                <option value="9">30</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className={cx("sorter")}>
                      <div className="row g-0">
                        <div className="col-lg-9 col-md-8 col-sm-6 col-4">
                          <Link
                            onClick={(e) => {
                              setGrids(false);
                            }}
                          >
                            <img src={col} alt="" />
                          </Link>{" "}
                          <Link to={"#"} onClick={(e) => setGrids(true)}>
                            <img src={grid} alt="" />
                          </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-8">
                          <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-5 col-6">
                              Sort By
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                              <select name="" id="">
                                <option value="default">Position</option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {grids ? null : (
                  <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className={cx("product-item")}>
                        <Link to={"#"}>
                          <div className={cx("thumnal-container")}>
                            <div className={cx("image-product")}>
                              <img
                                src={
                                  "https://res.cloudinary.com/dfszyazkj/image/upload/v1697122502/blogs/lpkm08n9qpbnin0fbkhp.webp"
                                }
                                alt=""
                              />
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
                          <div className={cx("name-product")}>123</div>
                          <div className={cx("price-product")}>$ 123</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className={cx("product-item")}>
                        <Link to={"#"}>
                          <div className={cx("thumnal-container")}>
                            <div className={cx("image-product")}>
                              <img
                                src={
                                  "https://res.cloudinary.com/dfszyazkj/image/upload/v1697122502/blogs/lpkm08n9qpbnin0fbkhp.webp"
                                }
                                alt=""
                              />
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
                          <div className={cx("name-product")}>123</div>
                          <div className={cx("price-product")}>$ 123</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className={cx("product-item")}>
                        <Link to={"#"}>
                          <div className={cx("thumnal-container")}>
                            <div className={cx("image-product")}>
                              <img
                                src={
                                  "https://res.cloudinary.com/dfszyazkj/image/upload/v1697122502/blogs/lpkm08n9qpbnin0fbkhp.webp"
                                }
                                alt=""
                              />
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
                          <div className={cx("name-product")}>123</div>
                          <div className={cx("price-product")}>$ 123</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className={cx("product-item")}>
                        <Link to={"#"}>
                          <div className={cx("thumnal-container")}>
                            <div className={cx("image-product")}>
                              <img
                                src={
                                  "https://res.cloudinary.com/dfszyazkj/image/upload/v1697122502/blogs/lpkm08n9qpbnin0fbkhp.webp"
                                }
                                alt=""
                              />
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
                          <div className={cx("name-product")}>123</div>
                          <div className={cx("price-product")}>$ 123</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
