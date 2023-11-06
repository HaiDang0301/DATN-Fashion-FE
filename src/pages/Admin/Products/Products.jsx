import excel from "../../../assets/excel.png";
import FileDownLoad from "js-file-download";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import routesConfig from "../../../config/routes";
import className from "classnames/bind";
import styles from "./Products.module.scss";
import modalAPI from "../../../api/Admin/modalAPI";
import { useEffect, useRef, useState } from "react";
import productsAPI from "../../../api/Admin/productsAPI";
import producersApi from "../../../api/Admin/producersAPI";
const cx = className.bind(styles);
function AdminProducts() {
  document.title = "Admin | Products";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [reload, setReload] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [id, setId] = useState("");
  const [collections, setCollections] = useState([]);
  const [producer, setProducer] = useState([]);
  const [products, setProducts] = useState([]);
  const [fileExcel, setFileExcel] = useState(null);
  const inputFiles = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const params = searchParams;
  useEffect(() => {
    const fetchAPI = async () => {
      await productsAPI.index(params).then((res) => {
        setProducts(res.data);
      });
    };
    const fetchCollections = async () => {
      const params = "collections";
      await modalAPI
        .index(params)
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
    const fetchProducer = async () => {
      await producersApi
        .index()
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
    fetchCollections();
    fetchProducer();
  }, [params, show, reload]);
  const handleImportExcel = async () => {
    if (!fileExcel) {
      toast.error("Please Choose Excel File", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    }
    const data = new FormData();
    data.append("excel", fileExcel);
    await productsAPI
      .importExcel(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Add Product List Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setReload(!reload);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error(
            "There are duplication products or files not in the format",
            {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            }
          );
        }
        if (err.response.status === 500) {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleDownloadFile = async (e) => {
    e.preventDefault();
    await productsAPI
      .downloadFile()
      .then((res) => {
        FileDownLoad(res.data, "sampleFile.csv");
      })
      .catch((err) => {
        toast.error("Connect Server False", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      });
  };
  const handleChangeProductCode = (e) => {
    setProductCode(e.target.value);
  };
  const handleSearch = () => {
    setSearchParams({
      product_code: productCode,
    });
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
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const handleDelete = async () => {
    await productsAPI
      .destroy(id)
      .then((res) => {
        if (res.data === "Delete Success") {
          toast.success("Delete Product Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setShow(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Can't Find Blogs", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setShow(false);
      });
  };
  const onclickInput = () => {
    inputFiles.current.click();
  };
  const changeExcel = (e) => {
    const file = e.target.files[0];
    setFileExcel(file);
  };
  return (
    <div className={cx("wrapper")}>
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
      <ToastContainer></ToastContainer>
      <div className="container">
        <div className={cx("product-act")}>
          <div className={cx("heading")}>
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                  <div className={cx("title")}>
                    <h5>Products List</h5>
                  </div>
                </div>
                <div className="col-lg-5 col-md-9 col-sm-8 col-8">
                  <div className={cx("search-name")}>
                    <div className="row">
                      <div className="col-lg-9 col-md-8 col-sm-9 col-9">
                        <input
                          type="search"
                          name="search"
                          id="search"
                          placeholder="Enter the product code"
                          onChange={handleChangeProductCode}
                        />
                      </div>
                      <div className="col-lg-2 col-md-4 col-sm-3 col-3">
                        <div className={cx("search")}>
                          <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-10 col-sm-10 col-10">
                  <div className="row">
                    <div className="col-lg-5 col-md-7 col-sm-6 col-6">
                      <div className={cx("excel-file")}>
                        <div className="row">
                          <div className="col-lg-3 col-md-2 col-sm-2 col-2">
                            <Link to={"#"} onClick={onclickInput}>
                              <img src={excel}></img>
                            </Link>
                          </div>
                          <div className="col-lg-9 col-md-10 col-sm-6 col-10">
                            <div className={cx("file-name")}>
                              <span htmlFor="">
                                {fileExcel ? fileExcel.name : "No File"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-2 col-sm-2 col-2">
                      <button
                        className="btn btn-primary"
                        onClick={handleImportExcel}
                      >
                        Import
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                      <div className={cx("download-file")}>
                        <Link
                          to={"#"}
                          onClick={handleDownloadFile}
                          className="btn btn-primary"
                        >
                          Sample file
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                  <div className={cx("create-product")}>
                    <Link
                      to={routesConfig.CreateProducts}
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("input-file")}>
            <input
              type="file"
              name="file"
              id="file"
              ref={inputFiles}
              onChange={changeExcel}
              accept=".csv"
            />
          </div>
        </div>
        <div className={cx("sort")}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                <div className={cx("status")}>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                      <div className={cx("title-sort")}>Collections</div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                      <div className={cx("input-sort")}>
                        <select
                          name=""
                          id=""
                          onChange={(e) => handleChangeCollection(e)}
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
              <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                <div className={cx("categories")}>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                      <div className={cx("title-sort")}>Producers</div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                      <div className={cx("input-sort")}>
                        <select
                          name="producer"
                          id="producer"
                          onChange={(e) => handleChangeProducer(e)}
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
              <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                <div className={cx("status")}>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                      <div className={cx("title-sort")}>Price</div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
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
            <tbody>
              {products.products
                ? products.products.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.productCode}</td>
                      <td>{item.name}</td>
                      <td>
                        {item.image[0] ? (
                          <img src={item.image[0].url} alt="" />
                        ) : (
                          <img
                            src="https://s2s.co.th/wp-content/uploads/2019/09/photo-icon-Copy-7.jpg"
                            alt=""
                          />
                        )}
                      </td>
                      <td>{Number(item.importPrice).toLocaleString()}</td>
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
                  ))
                : null}
            </tbody>
          </Table>
        </div>
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
  );
}
export default AdminProducts;
