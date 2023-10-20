import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./CategoryContent.module.scss";
import modalAPI from "../../../../../api/Admin/modalAPI";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
function CategoryContent(props) {
  const [showcontent, setShowContent] = useState(false);
  const handleCloseContent = () => setShowContent(false);
  const handleShowContent = () => setShowContent(true);
  const [callAPI, setCallAPI] = useState(true);
  const [results, setResults] = useState([]);
  const [collection, setCollection] = useState([]);
  const [valueCollection, setValueCollection] = useState();
  const [category, setCategory] = useState();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  var params = "collections";
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await modalAPI.getAll(params);
      setResults(result.data);
    };
    fetchAPI();
    fetchCollection();
  }, [callAPI]);
  const fetchCollection = async () => {
    await modalAPI
      .getAll(params)
      .then((res) => {
        setCollection(res.data);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleChangeCollection = (e) => {
    setValueCollection(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      collections: valueCollection,
      category: category,
    };
    await modalAPI
      .store(params, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Add Category Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setCallAPI(!callAPI);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleDestroy = async (id, collection, category) => {
    const data = {
      collections: collection,
      id: category,
    };
    await modalAPI
      .destroyCategory(params, id, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Delete Category Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setCallAPI(!callAPI);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  if (!collection) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("modals")}>
        <Modal show={showcontent} onHide={handleCloseContent}>
          <Modal.Header closeButton>
            <Modal.Title>Category management</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              defaultActiveKey="Category"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey="Category"
                title={`List Of Category`}
                className={cx("table")}
              >
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Name of the unit of measure</th>
                    </tr>
                  </thead>
                  {results.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <ul>
                            <li className={cx("collections")}>
                              {item.collections}
                              <ul>
                                {item.categories.map((category, index) => (
                                  <li className={cx("categories")} key={index}>
                                    <div className="row">
                                      <div className="col-lg-9">
                                        <input
                                          type="text"
                                          name=""
                                          id="category"
                                          value={category.category}
                                          className={cx("input")}
                                          onChange={(e) => {}}
                                        />
                                      </div>
                                      <div className="col-lg-3">
                                        <Link
                                          to={"#"}
                                          onClick={(e) => {
                                            handleDestroy(
                                              item._id,
                                              item.collections,
                                              category._id
                                            );
                                          }}
                                        >
                                          <i className="fa fa-trash"></i>
                                        </Link>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Tab>
              <Tab
                eventKey={`new Category`}
                title={`Create A New Category Of Calculation`}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className={cx("row")}>
                      <div className="col-lg-3">
                        <label htmlFor="collection">Collection</label>
                      </div>
                      <div className="col-lg-9">
                        <select
                          className={cx("collection")}
                          id="category"
                          onChange={handleChangeCollection}
                        >
                          <option value="">Collection</option>
                          {collection.map((item, index) => (
                            <option value={item.collections} key={index}>
                              {item.collections}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3">
                        <label htmlFor="category">Category</label>
                      </div>
                      <div className="col-lg-9">
                        <div className={cx("input")}>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder={`Enter The Category Name`}
                            onChange={handleChangeCategory}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("btn-save")}>
                      <Link
                        to={"#"}
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        <i className="fa fa-save"> Save</i>
                      </Link>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseContent}>
              <i className="fa fa-undo"> Close</i>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className={cx("show-modal")}>
        <Link to={"#"} className="btn btn-primary" onClick={handleShowContent}>
          ...
        </Link>
      </div>
    </div>
  );
}
export default CategoryContent;
