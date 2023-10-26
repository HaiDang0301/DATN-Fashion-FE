import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import loading from "../../../assets/loading.gif";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import Parser from "html-react-parser";
import col from "../../../assets/col.jpg";
import grid from "../../../assets/grid.jpg";
import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import modalAPI from "../../../api/Admin/modalAPI";
import producersApi from "../../../api/Admin/producersAPI";
import productsAPI from "../../../api/User/productsAPI";
const cx = classNames.bind(styles);
function Products() {
  document.title = "Collections";
  const type = useParams().type;
  const category = useParams().category;
  const [searchParams, setSearchParams] = useSearchParams();
  const [grids, setGrids] = useState(false);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [producers, setProducers] = useState([]);
  const [producer, setProducer] = useState();
  const [limit, setLimit] = useState(8);
  const [sort, setSort] = useState();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500);
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  let query = searchParams;
  let params = "";
  if (type && category) {
    params = `${type}/${category}`;
  }
  if (type && !category) {
    params = `${type}`;
  }
  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });
    const fetchProducts = async () => {
      const result = await productsAPI.index(params, query);
      setProducts(result.data);
    };
    setTimeout(() => {
      setIsloading(false);
    }, 1500);
    fetchProducts();
    fetchCollection();
    fetchProducer();
  }, [params, query, category]);
  const fetchCollection = async () => {
    const result = await modalAPI.getAll("collections");
    setCollections(result.data);
  };
  const fetchProducer = async () => {
    const result = await producersApi.getAll();
    setProducers(result.data);
  };
  const handlePage = async (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const handleCol = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
    setGrids(false);
  };
  const handleGrid = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
    setGrids(true);
  };
  const handleProducer = (e, value) => {
    setIsloading(true);
    if (checked.includes[value]) {
      setChecked(checked.filter((item) => item !== value));
    } else {
      setChecked([value]);
    }
    setProducer(e.target.value);
    const producer = e.target.value;
    setSearchParams({
      producer: producer,
    });
  };
  const handleFilter = (e) => {
    setChecked([""]);
    setIsloading(true);
    const begin = min;
    const final = max;
    setSearchParams({
      min: begin,
      max: final,
    });
  };
  const handleLimit = async (e) => {
    setSort("");
    setLimit(e.target.value);
    const limit = e.target.value;
    setSearchParams({
      limit: limit,
    });
  };
  const handleSort = (e) => {
    setLimit(8);
    setSort(e.target.value);
    const bySort = e.target.value;
    setSearchParams({
      sort: bySort,
    });
  };
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4 col-12">
            <div className={cx("menu-left")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("collections")}>
                    <h4>Collections</h4>
                    <ul>
                      {collections
                        ? collections.map((item, index) => (
                            <li key={index} className={cx("name-collection")}>
                              <h4>
                                <Link
                                  to={`/collections/${item.collections}`}
                                  onClick={(e) => setIsloading(true)}
                                >
                                  {item.collections}{" "}
                                </Link>
                              </h4>
                              <ul className={cx("category")}>
                                {item.categories.map((i, index) => (
                                  <li key={index}>
                                    <Link
                                      to={`/collections/${item.collections}/${i.category}`}
                                      onClick={(e) => {
                                        setIsloading(true);
                                      }}
                                    >
                                      {i.category}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("manufacturer")}>
                    <h4>Brand</h4>
                    <ul>
                      {producers.producers
                        ? producers.producers.map((item, index) => (
                            <li key={index}>
                              <input
                                type="checkbox"
                                name="producer"
                                id="producer"
                                checked={checked.includes(item.name)}
                                value={item.name}
                                onChange={(e) => handleProducer(e, item.name)}
                              />
                              {item.name}
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("price")}>
                    <h4>Price</h4>
                    <div className="show-price">
                      ${Number(min).toLocaleString()} - $
                      {Number(max).toLocaleString()}
                    </div>
                    <div className={cx("process")}></div>
                    <div className={cx("toolbar")}>
                      <div className={cx("range-min")}>
                        <input
                          type="range"
                          name="min"
                          id="min"
                          value={min}
                          min={0}
                          max={100}
                          onChange={(e) => setMin(e.target.value)}
                        />
                      </div>
                      <div className={cx("range-max")}>
                        <input
                          type="range"
                          name="max"
                          id="max"
                          value={max}
                          min={100}
                          max={500}
                          onChange={(e) => setMax(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("filter")}>
                    <button onClick={handleFilter}>Filter</button>
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
                    <Link to={routesConfig.home}>HOME </Link>{" "}
                    <i className="fa fa-long-arrow-right"></i>{" "}
                    <Link to={type ? `/collections/${type}` : "/collections"}>
                      {type ? type.toLocaleUpperCase() : "COLLECTIONS"}
                    </Link>
                  </label>
                </div>
                <div className="col-lg-12">
                  <div className={cx("title")}>
                    <h5>{type ? type.toLocaleUpperCase() : "COLLECTIONS"}</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("tool-bar")}>
                    <div className={cx("quick-access")}>
                      <div className="row">
                        <div className="col-lg-10 col-md-9 col-sm-8 col-8">
                          {" "}
                          {limit} items
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-4">
                              Show
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-4">
                              <select
                                name="limit"
                                id="limit"
                                value={limit}
                                onChange={handleLimit}
                              >
                                <option value="8">8</option>
                                <option value="12">12</option>
                                <option value="24">24</option>
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
                          <button onClick={handleCol}>
                            <img src={col} alt="" />
                          </button>

                          <button onClick={handleGrid}>
                            <img src={grid} alt="" />
                          </button>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-8">
                          <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-5 col-6">
                              Sort By
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                              <select
                                name="sort"
                                id="sort"
                                value={sort}
                                onChange={handleSort}
                              >
                                <option value=""></option>
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
                {grids ? (
                  <div className={cx("grid-1")}>
                    {products.products
                      ? products.products.map((item, index) =>
                          isLoading ? (
                            <div className={cx("isloading")} key={index}>
                              <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                  <div className={cx("img-loading")}>
                                    <img src={loading} alt="" />
                                  </div>
                                </div>
                                <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                  <Skeleton count={7} width={440}></Skeleton>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="row" key={index}>
                              <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                <div className={cx("product-item")}>
                                  <Link
                                    to={
                                      params
                                        ? `/collections/${params}/products/${item.slug}`
                                        : `/collections/products/${item.slug}`
                                    }
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
                                        {type === "new-products" ? (
                                          <span>NEW</span>
                                        ) : null}
                                      </div>
                                      {type === "sale" ? (
                                        <>
                                          <div
                                            className={cx("product-flag-sale")}
                                          >
                                            <span>Sale</span>
                                          </div>
                                          <div className={cx("sale")}>
                                            <span>-{item.promotion}%</span>
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                <div className={cx("name-product")}>
                                  {item.name}
                                </div>
                                <div className={cx("price-products")}>
                                  {type === "sale" ? (
                                    <div className={cx("price-product")}>
                                      <div className={cx("old-price")}>
                                        ${" "}
                                        {Number(
                                          item.old_price
                                        ).toLocaleString()}
                                      </div>
                                      <div className={cx("now-price")}>
                                        $ {Number(item.price).toLocaleString()}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className={cx("price-product")}>
                                      $ {Number(item.price).toLocaleString()}
                                    </div>
                                  )}
                                </div>
                                <div className={cx("price-description")}>
                                  {Parser(item.description)}
                                </div>
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </div>
                ) : (
                  <div className={cx("grid-3")}>
                    <div className="row">
                      {products.products
                        ? products.products.map((item, index) =>
                            isLoading ? (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-6"
                                key={index}
                              >
                                <div className={cx("isloading")}>
                                  <div className={cx("img-loading")}>
                                    <img src={loading} alt="" />
                                  </div>
                                  <div className={cx("loading-information")}>
                                    <Skeleton
                                      count={2}
                                      width={180}
                                      height={20}
                                    ></Skeleton>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-6"
                                key={index}
                              >
                                <div className={cx("product-item")}>
                                  <Link
                                    to={
                                      params
                                        ? `/collections/${params}/products/${item.slug}`
                                        : `/collections/products/${item.slug}`
                                    }
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
                                        {type === "new-products" ? (
                                          <span>NEW</span>
                                        ) : null}
                                      </div>
                                      {type === "sale" ? (
                                        <>
                                          <div
                                            className={cx("product-flag-sale")}
                                          >
                                            <span>Sale</span>
                                          </div>
                                          <div className={cx("sale")}>
                                            <span>-{item.promotion}%</span>
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </Link>
                                  <div className={cx("product-description")}>
                                    <div className={cx("name-product")}>
                                      {item.name}
                                    </div>
                                    {type === "sale" ? (
                                      <div className={cx("price-product")}>
                                        <div className={cx("old-price")}>
                                          $
                                          {Number(
                                            item.old_price
                                          ).toLocaleString()}
                                        </div>
                                        <div className={cx("now-price")}>
                                          ${Number(item.price).toLocaleString()}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className={cx("price-product")}>
                                        $ {Number(item.price).toLocaleString()}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        : null}
                    </div>
                  </div>
                )}
              </div>{" "}
              <div className={cx("panigate")}>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePage}
                  pageCount={products.totalPage || 1}
                  previousLabel="<"
                  forcePage={searchParams.get("page") - 1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
