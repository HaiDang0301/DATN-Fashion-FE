import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./ModalContent.module.scss";
const cx = classNames.bind(styles);
function ModalContent(props) {
  const [showcontent, setShowContent] = useState(false);
  const handleCloseContent = () => setShowContent(false);
  const handleShowContent = () => setShowContent(true);
  const [edit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(false);
  };
  return (
    <div className={cx("wrapper")}>
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
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Name of the unit of measure</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <input
                          type="text"
                          name=""
                          id=""
                          className={cx("input")}
                          disabled={edit}
                        />
                      </td>
                      <td>
                        <div className={cx("action")}>
                          <Link to={"#"}>
                            <i className="fa fa-edit" onClick={handleEdit}></i>
                          </Link>
                          <Link to={"#"}>
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
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
                        name=""
                        id=""
                        placeholder={`Enter The ${props.title} Name`}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className={cx("btn-save")}>
                      <Link to={"#"} className="btn btn-primary">
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
