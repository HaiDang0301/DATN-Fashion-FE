import producersApi from "../../../api/Admin/producersAPI";
import { Link, useSearchParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routesConfig from "../../../config/routes";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./Producers.module.scss";
const cx = className.bind(styles);
function AdminProducers() {
  document.title = "Admin | Producers";
  let [searchParams, setSearchParams] = useSearchParams();
  const [producers, setProducers] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState("");
  const handleClose = () => setShow(false);
  const params = searchParams;
  useEffect(() => {
    const fetchProducers = async () => {
      const producers = await producersApi.getAll(params);
      setProducers(producers.data);
    };
    fetchProducers();
  }, [show, params]);
  const handleDelete = async () => {
    const deleteProducer = await producersApi.deleteProducer(id).then((res) => {
      if (res.data === "Delete Producer Success") {
        toast.success("Delete Producer Success", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      if (res.status === 404) {
        toast.error("Can't Find Producer", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      setShow(false);
    });
  };
  const handlePage = (e) => {
    const newPage = e.selected + 1;
    setSearchParams({
      page: newPage,
    });
  };
  const handleSelect = (e) => {
    const search = e.target.value;
    setSelect(search);
  };
  const handleSearch = (e) => {
    setSearchParams({
      status: select,
    });
  };
  if (!producers) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx("modal-title")}>
            <i className="fa fa-warning"> Notification</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your producer !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="btn btn-danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={cx("producers")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-5 col-sm-4 col-0">
              <h5>Producers List</h5>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-9">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                  <select
                    name="sort"
                    id="sort"
                    className={cx("select")}
                    onClick={handleSelect}
                  >
                    <option value="default">Default</option>
                    <option value="Providing">Providing</option>
                    <option value="Stop-Providing">Stop Providing</option>
                  </select>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-3">
              <div className={cx("create-producers")}>
                <Link
                  to={routesConfig.CreateProducers}
                  className="btn btn-primary"
                >
                  Create
                </Link>
              </div>
            </div>
            <div className={cx("table-producers")}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Adress</th>
                    <th>Status</th>
                    <th>Sign_Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {producers.producers
                  ? producers.producers.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_number}</td>
                          <td>{item.address}</td>
                          <td>{item.status}</td>
                          <td>{item.contract_sign_date.slice(0, 10)}</td>
                          <td>
                            <div className={cx("action")}>
                              <div className={cx("update")}>
                                <Link
                                  to={item._id + "/edit"}
                                  className="btn btn-warning"
                                >
                                  Update
                                </Link>
                              </div>
                              <div className={cx("delete")}>
                                <Link
                                  to={"#"}
                                  onClick={(e) => {
                                    setId(item._id), setShow(true);
                                  }}
                                  className="btn btn-danger"
                                >
                                  Delete
                                </Link>
                              </div>
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
                pageCount={producers.totalPage || 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducers;
