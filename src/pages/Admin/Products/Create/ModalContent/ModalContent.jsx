import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import modalAPI from "../../../../../api/Admin/modalAPI";
import classNames from "classnames/bind";
import styles from "./ModalContent.module.scss";
const cx = classNames.bind(styles);
function ModalContent(props) {
  const [showcontent, setShowContent] = useState(false);
  const handleCloseContent = () => setShowContent(false);
  const handleShowContent = () => setShowContent(true);
  const [value, setValue] = useState();
  const [callApi, setCallApi] = useState(false);
  const [results, setResults] = useState([]);
  var params = props.title.toLowerCase() + "s";
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await modalAPI.getAll(params);
      setResults(result.data);
    };
    fetchAPI();
  }, [callApi]);
  const handleSubmit = async () => {
    var data = {};
    if (params === "collections") {
      data = { collections: value };
    }
    if (params === "colors") {
      data = { colors: value };
    }
    if (params === "sizes") {
      data = { sizes: value };
    }
    await modalAPI
      .store(params, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Add ${params} Success`, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setCallApi(!callApi);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        if (err.response.status === 401) {
          toast.error(`${params} has existed`, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleDestroy = async (id) => {
    await modalAPI
      .destroy(params, id)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Delete ${params} Success`, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setCallApi(!callApi);
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.response.status === 500) {
          toast.error("Connect server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("modals")}>
        <Modal show={showcontent} onHide={handleCloseContent}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title} management</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              defaultActiveKey={props.title}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey={props.title} title={`List of ${props.title}`}>
                <Table striped bordered hover className={cx("table")}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Name of the unit of measure</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {results.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <input
                            type="text"
                            name={props.title.toLowerCase()}
                            id={props.title.toLowerCase()}
                            className={cx("input")}
                            value={
                              item.collections || item.colors || item.sizes
                            }
                            onChange={(e) => {}}
                          />
                        </td>
                        <td>
                          <div className={cx("action")}>
                            <Link
                              to={"#"}
                              onClick={(e) => handleDestroy(item._id)}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Tab>
              <Tab
                eventKey={`new ${props.title}`}
                title={`Create A New ${props.title} Of Calculation`}
              >
                <div className="row">
                  <div className="col-lg-9">
                    <div className={cx("input")}>
                      <input
                        type="text"
                        name={props.title.toLowerCase() + "s"}
                        id={props.title.toLowerCase() + "s"}
                        placeholder={`Enter The ${props.title} Name`}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
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
export default ModalContent;
