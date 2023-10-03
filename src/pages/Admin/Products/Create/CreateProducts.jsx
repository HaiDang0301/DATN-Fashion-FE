import { Link } from "react-router-dom";
import React, { Fragment, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import className from "classnames/bind";
import styles from "./CreateProducts.module.scss";
import CategoryContent from "./CategoryContent/CategoryContent";
import ModalContent from "./ModalContent/ModalContent";
const cx = className.bind(styles);
function CreateProducts() {
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [buffer, setBuffer] = useState([{ size: "", quantity: "" }]);
  document.title = "Admin | Create Products";
  function handleChooseFile(e) {
    const image = e.target.files[0];
    setImg(image);
  }
  const handleAdd = () => {
    let newfield = { size: "", quantity: "" };
    setBuffer([...buffer, newfield]);
    console.log(buffer);
  };
  const handleTrash = (index) => {
    let data = [...buffer];
    data.splice(index, 1);
    setBuffer(data);
    console.log(data);
  };
  const handleFormChange = (index, event) => {
    let data = [...buffer];
    data[index][event.target.name] = event.target.value;
    setBuffer(data);
    console.log(buffer);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("product-act")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className={cx("title")}>
                <h5>
                  <i className="fa fa-file"> Create Product</i>
                </h5>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={cx("save")}>
                <div className="row g-0">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className={cx("save")}>
                      <Link to={"#"} className="btn btn-primary">
                        <i className="fa fa-check"> Save</i>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className={cx("save")}>
                      <Link to={"#"} className="btn btn-primary">
                        <i className="fa fa-save"> Save and continue</i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form action="">
        <div className={cx("product-form")}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h5>Basic information</h5>
                <p>Enter the name and basic information of the product</p>
              </div>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12">
                    <div className={cx("title")}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className={cx("text")}>
                            <h5>Product Name</h5>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className={cx("input")}>
                            <input
                              type="text"
                              name=""
                              id=""
                              placeholder="Enter the product name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("title")}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className={cx("text")}>
                            <h5>Product Code</h5>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className={cx("input")}>
                            <input
                              type="text"
                              name="product_code"
                              id="product_code"
                              placeholder="Enter the product code, otherwise the system will random code itself"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className={cx("title")}>
                          <h5>Producer</h5>
                        </div>
                        <div className={cx("content")}>
                          <div className="row">
                            <div className="col-lg-12">
                              <select name="" id="">
                                <option value="">Hour</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className={cx("title")}>
                            <h5>Collection</h5>
                          </div>
                          <div className="col-lg-10">
                            <div className={cx("content")}>
                              <select name="collection" id="collection">
                                <option value="">Collection</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <ModalContent title="Collection"></ModalContent>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="row">
                          <div className={cx("title")}>
                            <h5>Category</h5>
                          </div>
                          <div className="col-lg-10">
                            <div className={cx("content")}>
                              <select name="category" id="category">
                                <option value="">Category</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <CategoryContent title="Category"></CategoryContent>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className={cx("title")}>
                            <h5>Color</h5>
                          </div>
                          <div className="col-lg-10">
                            <div className={cx("content")}>
                              <select name="color" id="color">
                                <option value="">Color</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <ModalContent title="Color"></ModalContent>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className={cx("title")}>
                              <h5>Import Price</h5>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className={cx("input")}>
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className={cx("title")}>
                              <h5>Price</h5>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className={cx("input")}>
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {buffer.length > 0
                    ? buffer.map((item, index) => (
                        <div key={index} className={cx("form")}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="row">
                                <div className={cx("title")}>
                                  <h5>Size</h5>
                                </div>
                                <div className="col-lg-10">
                                  <div className={cx("content")}>
                                    <select
                                      name="size"
                                      id="size"
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    >
                                      <option value="defaault">Default</option>
                                      <option value="X">X</option>
                                      <option value="Xl">XL</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-2">
                                  <ModalContent title="Size"></ModalContent>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className={cx("quantity")}>
                                    <div className="row">
                                      <div className="col-lg-8 col-md-8 col-sm-8">
                                        <h5>Quantity</h5>
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className={cx("option")}>
                                          <Link to={"#"} onClick={handleAdd}>
                                            <i className="fa fa-plus"></i>
                                          </Link>
                                          <Link
                                            to={"#"}
                                            onClick={(e) => handleTrash(index)}
                                          >
                                            <i className="fa fa-trash"></i>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className={cx("input")}>
                                    <input
                                      type="text"
                                      name="quantity"
                                      id="quantity"
                                      placeholder="0"
                                      value={item.quantity}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                  <div className="col-lg-12">
                    <div className={cx("description")}>
                      <h5>Description</h5>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={cx("editor")}>
                      <Editor
                        apiKey="ns9ltjxjky7crwvi0lq241xpborim7o4p8j36twsf0s7lxna"
                        onEditorChange={setDescription}
                        value={description}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "a11ychecker",
                            "advlist",
                            "advcode",
                            "advtable",
                            "autolink",
                            "checklist",
                            "export",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "powerpaste",
                            "fullscreen",
                            "formatpainter",
                            "insertdatetime",
                            "media",
                            "table",
                            "quickbars",
                          ],
                          toolbar:
                            "undo redo | casechange blocks | bold italic backcolor | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist checklist | removeformat | quickimage",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("import-image")}>
              <div className={cx("setup-file")}>
                <div className={cx("image")}>
                  <div className={cx("show-img")}>
                    {img ? (
                      <img src={URL.createObjectURL(img)} alt="" />
                    ) : (
                      <img src=""></img>
                    )}
                  </div>
                </div>
                <h5>Upload product images</h5>
                <p>
                  (For fast loading and rendering, each upload should be up to
                  10MB in size.)
                </p>
                <input
                  type="file"
                  name=""
                  id=""
                  onChange={handleChooseFile}
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default CreateProducts;
