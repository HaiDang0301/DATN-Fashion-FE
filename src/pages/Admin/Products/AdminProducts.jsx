import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import routesConfig from "../../../config/routes";
import modalAPI from "../../../api/Admin/modalAPI";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import productsAPI from "../../../api/Admin/productsAPI";
import producersApi from "../../../api/Admin/producersAPI";
import { cx } from "./Products";

export function AdminProducts() {
  document.title = "Admin | Products";
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [collections, setCollections] = useState([]);
  const [producer, setProducer] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [id, setId] = useState("");
  const params = searchParams;
  useEffect(() => {
    const fetchAPI = async () => {
      await productsAPI.getAll(params).then((res) => {
        setProducts(res.data);
      });
    };
    fetchAPI();
  }, [params, show]);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleSearch = () => {
    setSearchParams({
      name: name,
    });
  };
  const handleCollections = async () => {
    const params = "collections";
    const fetchAPI = async () => {
      await modalAPI
        .getAll(params)
        .then((res) => {
          setCollections(res.data);
        })
        .catch((err) => {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        });
    };
    fetchAPI();
  };
  const handleProducer = async () => {
    const fetchAPI = async () => {
      await producersApi
        .getAll()
        .then((res) => {
          setProducer(res.data);
        })
        .catch((err) => {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        });
    };
    fetchAPI();
  };
  const handleChangeCollection = (e) => {
    const value = e.target.value;
    setSearchParams({
      collection: value,
    });
  };
  const handleChangeProducer = (e) => {
    const value = e.target.value;
    setSearchParams({
      producer: value,
    });
  };
  const handleChangePrice = (e) => {
    const value = e.target.value;
    setSearchParams({
      price: value,
    });
  };
  const handlePage = (e) => {
    const newPage = e.selected + 1;
    const collection = searchParams.get("collection");
    const producer = searchParams.get("producer");
    const price = searchParams.get("price");
    if (searchParams) {
      if (collection) {
        setSearchParams({
          collection: collection,
          page: newPage,
        });
      }
      if (producer) {
        setSearchParams({
          producer: producer,
          page: newPage,
        });
      }
      if (price) {
        setSearchParams({
          price: price,
          page: newPage,
        });
      }
    } else {
      setSearchParams({
        page: newPage,
      });
    }
  };
  const handleDelete = async () => {
    await productsAPI.deleteProducts(id);
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are sure to delete the product !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className={cx("product-act")}>
          <div className="row g-0">
            <div className="col-lg-2">
              <div className={cx("title")}>
                <h5>Products List</h5>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className={cx("search-name")}>
                <div className="row">
                  <div className="col-lg-8">
                    <input
                      type="search"
                      name="file"
                      id="file"
                      placeholder="Enter the product name you want to search"
                      onChange={handleChangeName}
                    />
                  </div>
                  <div className="col-lg-4">
                    <button className="btn btn-primary" onClick={handleSearch}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className={cx("download-file")}>
                <button className="btn btn-primary">Download File</button>
              </div>
            </div>
            <div className="col-lg-2">
              <div className={cx("create-product")}>
                <Link
                  to={routesConfig.CreateProducts}
                  className="btn btn-primary"
                >
                  Create Products
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("sort")}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div className={cx("status")}>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className={cx("title-sort")}>Collections</div>
                    </div>
                    <div className="col-lg-8">
                      <div className={cx("input-sort")}>
                        <select
                          name=""
                          id=""
                          onChange={handleChangeCollection}
                          onClick={handleCollections}
                        >
                          <option value="">Default</option>
                          {collections
                            ? collections.map((item, index) => (
                                <option value={item.collections} key={index}>
                                  {item.collections}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className={cx("categories")}>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className={cx("title-sort")}>Producers</div>
                    </div>
                    <div className="col-lg-8">
                      <div className={cx("input-sort")}>
                        <select
                          name=""
                          id=""
                          onClick={handleProducer}
                          onChange={handleChangeProducer}
                        >
                          <option value="">Default</option>
                          {producer.producers
                            ? producer.producers.map((item, index) => (
                                <option value={item.name} key={index}>
                                  {item.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className={cx("status")}>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className={cx("title-sort")}>Price</div>
                    </div>
                    <div className="col-lg-8">
                      <div className={cx("input-sort")}>
                        <select name="" id="" onChange={handleChangePrice}>
                          <option value="default">Default</option>
                          <option value="increase">
                            Product prices gradually increase
                          </option>
                          <option value="reduce">
                            Product prices gradually decrease
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("table-products")}>
          <Table striped bordered hover className={cx("table")}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>STT</th>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Import Price</th>
                <th>Sale Price</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            {products.products
              ? products.products.map((item, index) => (
                  <tbody key={index + 1}>
                    <tr>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>1</td>
                      <td>{item.productCode}</td>
                      <td>{item.name}</td>
                      <td>
                        <img src={item.image[0].url} alt="" />
                      </td>
                      <td>{item.importPrice}</td>
                      <td>{Number(item.price).toLocaleString()}</td>
                      <td>{item.producer}</td>
                      <td>
                        <div className={cx("action")}>
                          <Link to={item._id + "/edit"}>
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link
                            to={"#"}
                            onClick={(e) => {
                              setId(item._id), setShow(true);
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              : null}
          </Table>
        </div>
        <div className={cx("panigate")}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePage}
            pageCount={products.totalPage || 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
        <div className={cx("total-product")}>
          <label htmlFor="total-product">
            Total products / Manufacturer Quantity
          </label>
        </div>
      </div>
    </div>
  );
}
