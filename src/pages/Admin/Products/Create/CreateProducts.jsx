import { Link } from "react-router-dom";
import loading from "../../../../assets/loading.gif";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import className from "classnames/bind";
import styles from "./CreateProducts.module.scss";
import CategoryContent from "./CategoryContent/CategoryContent";
import ModalContent from "./ModalContent/ModalContent";
import modalAPI from "../../../../api/Admin/modalAPI";
import { toast } from "react-toastify";
import productsAPI from "../../../../api/Admin/productsAPI";
const cx = className.bind(styles);
function CreateProducts() {
  const [isLoading, setIsloading] = useState();
  const [producers, setProducers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [img, setImg] = useState();
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [buffer, setBuffer] = useState([{ size: "", quantity: "" }]);
  document.title = "Admin | Create Products";
  useEffect(() => {
    fetchSizes();
    fetchColors();
    fetchProducer();
    fetchCollection();
  }, []);
  const fetchProducer = async () => {
    const params = "producers";
    await modalAPI
      .getAll(params)
      .then((res) => {
        setProducers(res.data);
      })
      .catch((err) => {
        toast.error("Connect Server False", {
          position: "bottom-right",
          autoClose: "5000",
          theme: "light",
        });
      });
  };
  const fetchCollection = async () => {
    const params = "collections";
    await modalAPI
      .getAll(params)
      .then((res) => {
        setCollections(res.data);
      })
      .catch((err) => {
        toast.error("Connect Server False", {
          position: "bottom-right",
          autoClose: "5000",
          theme: "light",
        });
      });
    if (collections) {
      const params = `collections?collection=${formik.values.collection}`;
      await modalAPI
        .getAll(params)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: "5000",
            theme: "light",
          });
        });
    }
  };
  const fetchColors = async () => {
    const params = "colors";
    await modalAPI
      .getAll(params)
      .then((res) => {
        setColors(res.data);
      })
      .catch((err) => {
        toast.error("Connect Server False", {
          position: "bottom-right",
          autoClose: "5000",
          theme: "light",
        });
      });
  };
  const fetchSizes = async () => {
    const params = "sizes";
    await modalAPI
      .getAll(params)
      .then((res) => {
        setSizes(res.data);
      })
      .catch((err) => {
        toast.error("Connect Server False", {
          position: "bottom-right",
          autoClose: "5000",
          theme: "light",
        });
      });
  };
  function handleChooseFile(e) {
    setImg(e.target.files[0]);
    setFiles(e.target.files);
  }
  const handleAdd = () => {
    let newfield = { size: "", quantity: "" };
    setBuffer([...buffer, newfield]);
  };
  const handleTrash = (index) => {
    let data = [...buffer];
    data.splice(index, 1);
    setBuffer(data);
  };
  const handleFormChange = (index, event) => {
    let data = [...buffer];
    data[index][event.target.name] = event.target.value;
    setBuffer(data);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      product_code: "",
      producer: "",
      collection: "",
      category: "",
      color: "",
      import_price: "",
      price: "",
      quantity: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(100, "Maximum of 20 characters")
        .required("Please provide full name product"),
      product_code: Yup.string()
        .min(0, "Minimum 2 characters")
        .max(6, "Maximum of 6 characters"),
      producer: Yup.string().required("Please provide producer"),
      collection: Yup.string().required("Please provide collection"),
      category: Yup.string().required("Please provide category"),
      color: Yup.string().required("Please provide color"),
      import_price: Yup.string().required("Please provide import price"),
      price: Yup.string().required("Please provide price"),
      size: Yup.string().required("Please provide size"),
      quantity: Yup.string().required("Please provide quantity"),
    }),
  });
  const handleSubmit = async () => {
    setIsloading(true);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("image", files[i]);
    }
    data.append("name", formik.values.name);
    data.append("productCode", formik.values.product_code);
    data.append("producer", formik.values.producer);
    data.append("collections", formik.values.collection);
    data.append("category", formik.values.category);
    data.append("color", formik.values.color);
    data.append("importPrice", formik.values.import_price);
    data.append("price", formik.values.price);
    buffer.map((item) => {
      data.append("size", item.size);
      data.append("quantity", item.quantity);
    });
    data.append("description", description);
    if (!img) {
      toast.error("Please provide image", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
      setIsloading(false);
    }
    if (
      formik.values.name ||
      formik.values.product_code ||
      formik.values.import_price ||
      formik.values.price ||
      formik.values.quantity ||
      description
    ) {
      await productsAPI.store(data).then((res) => {
        if (res.status === 200) {
          toast.success("Add products Sucssces", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setIsloading(false);
      });
    } else {
      if (res.status === 200) {
        toast.error("Please provide full information", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
      setIsloading(false);
    }
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
                      {isLoading ? (
                        <img src={loading}></img>
                      ) : (
                        <Link
                          to={"#"}
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          <i className="fa fa-check"> Save</i>
                        </Link>
                      )}
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
                              name="name"
                              id="name"
                              placeholder="Enter the product name"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                        <div className={cx("errors")}>
                          {formik.touched.name && formik.errors.name ? (
                            <>
                              <i className="fa fa-warning">
                                {" "}
                                {formik.errors.name}
                              </i>
                            </>
                          ) : null}
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
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                            />
                            <div className={cx("errors")}>
                              {formik.touched.product_code &&
                              formik.errors.product_code ? (
                                <>
                                  <i className="fa fa-warning">
                                    {" "}
                                    {formik.errors.product_code}
                                  </i>
                                </>
                              ) : null}
                            </div>
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
                              <select
                                name="producer"
                                id="producer"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="default">Default</option>
                                {producers.producers
                                  ? producers.producers.map((item, index) => (
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
                      <div className="col-lg-6">
                        <div className="row">
                          <div className={cx("title")}>
                            <h5>Collection</h5>
                          </div>
                          <div className="col-lg-10">
                            <div className={cx("content")}>
                              <select
                                name="collection"
                                id="collection"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="default">Default</option>
                                {collections.map((item, index) => (
                                  <option value={item.collections} key={index}>
                                    {item.collections}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <ModalContent
                              title="Collection"
                              show={true}
                            ></ModalContent>
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
                              <select
                                name="category"
                                id="category"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="default">Default</option>
                                {categories
                                  ? categories.map((item) =>
                                      item.categories.map((i, index) => (
                                        <option value={i.category} key={index}>
                                          {i.category}
                                        </option>
                                      ))
                                    )
                                  : null}
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
                              <select
                                name="color"
                                id="color"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              >
                                <option value="default">Default</option>
                                {colors.map((item, index) => (
                                  <option
                                    value={item.colors}
                                    key={index}
                                    style={{
                                      backgroundColor: `${item.colors}`,
                                    }}
                                  >
                                    {item.colors}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <ModalContent
                              title="Color"
                              colors={true}
                            ></ModalContent>
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
                                name="import_price"
                                id="import_price"
                                placeholder="0"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              />
                              <div className={cx("errors")}>
                                {formik.touched.import_price &&
                                formik.errors.import_price ? (
                                  <>
                                    <i className="fa fa-warning">
                                      {" "}
                                      {formik.errors.import_price}
                                    </i>
                                  </>
                                ) : null}
                              </div>
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
                                name="price"
                                id="price"
                                placeholder="0"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              />
                              <div className={cx("errors")}>
                                {formik.touched.price && formik.errors.price ? (
                                  <>
                                    <i className="fa fa-warning">
                                      {" "}
                                      {formik.errors.price}
                                    </i>
                                  </>
                                ) : null}
                              </div>
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
                                      <option value="default">Default</option>
                                      {sizes.map((item) => (
                                        <option
                                          value={item.sizes}
                                          key={item._id}
                                        >
                                          {item.sizes}
                                        </option>
                                      ))}
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
                                      onBlur={formik.handleBlur}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <div className={cx("errors")}></div>
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
                      <div className={cx("image-upload")}>
                        <img src={URL.createObjectURL(img)} />
                        <p>+{files.length - 1}</p>
                      </div>
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
                  name="image"
                  id="image"
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
