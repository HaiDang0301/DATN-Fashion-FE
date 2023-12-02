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
  document.title = "Admin | Quản lý sản phẩm";
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
          toast.error("Lỗi Server", {
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
          toast.error("Lỗi Server", {
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
      toast.error("Vui lòng chọn file excel", {
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
          toast.success("Thêm danh sách sản phẩm thành công", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setReload(!reload);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("Sản phẩm đã tồn tại hoặc file không đúng định dạng", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        if (err.response.status === 500) {
          toast.error("Lỗi Server", {
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
        toast.error("Lỗi Server", {
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
          toast.success("Xóa sản phẩm thành công", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setShow(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Không tìm thấy sản phẩm", {
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
          <Modal.Title>Cảnh Báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xác Nhận
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
                    <h5>Sản Phẩm</h5>
                  </div>
                </div>
                <div className="col-lg-4 col-md-9 col-sm-8 col-8">
                  <div className={cx("search-name")}>
                    <div className="row">
                      <div className="col-lg-8 col-md-8 col-sm-9 col-9">
                        <input
                          type="search"
                          name="search"
                          id="search"
                          placeholder="Nhập mã sản phẩm"
                          onChange={handleChangeProductCode}
                        />
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-3 col-3">
                        <div className={cx("search")}>
                          <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                          >
                            Tìm Kiếm
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
                        Nhập
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                      <div className={cx("download-file")}>
                        <Link
                          to={"#"}
                          onClick={handleDownloadFile}
                          className="btn btn-primary"
                        >
                          File Mẫu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                  <div className={cx("create-product")}>
                    <Link
                      to={routesConfig.CreateProducts}
                      className="btn btn-primary"
                    >
                      Tạo Mới
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
                      <div className={cx("title-sort")}>Bộ Sưu Tập</div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                      <div className={cx("input-sort")}>
                        <select
                          name=""
                          id=""
                          onChange={(e) => handleChangeCollection(e)}
                        >
                          <option value=""></option>
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
                      <div className={cx("title-sort")}>Thương Hiệu</div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                      <div className={cx("input-sort")}>
                        <select
                          name="producer"
                          id="producer"
                          onChange={(e) => handleChangeProducer(e)}
                        >
                          <option value=""></option>
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
                      <div className={cx("title-sort")}>Giá</div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                      <div className={cx("input-sort")}>
                        <select name="" id="" onChange={handleChangePrice}>
                          <option value="default"></option>
                          <option value="increase">
                            Giá sản phẩm tăng dần
                          </option>
                          <option value="reduce">Giá sản phẩm giảm dần</option>
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
                <th>STT</th>
                <th>Mã Sản Phẩm</th>
                <th>Tên Sản Phẩm</th>
                <th>Hình Ảnh</th>
                <th>Kích Thước</th>
                <th>Số Lượng</th>
                <th>Giá Nhập</th>
                <th>Giá Bán</th>
                <th>Thương Hiệu</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.products
                ? products.products.map((item, index) => (
                    <tr key={index}>
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
                      <td>
                        {item.sizes.map((size, index) => (
                          <p key={index}>{size.size}</p>
                        ))}
                      </td>
                      <td>
                        {item.sizes.map((size, index) => (
                          <p key={index}>{size.quantity}</p>
                        ))}
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
