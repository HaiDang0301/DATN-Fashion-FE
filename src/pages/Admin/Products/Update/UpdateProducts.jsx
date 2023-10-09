import { Link, useParams } from "react-router-dom";
import loading from "../../../../assets/loading.gif";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import className from "classnames/bind";
import styles from "./UpdateProducts.module.scss";
import CategoryContent from "./CategoryContent/CategoryContent";
import ModalContent from "./ModalContent/ModalContent";
import modalAPI from "../../../../api/Admin/modalAPI";
import { toast } from "react-toastify";
import productsAPI from "../../../../api/Admin/productsAPI";
import formatDate from "../../../../formatDate/formatDate";
const cx = className.bind(styles);
function UpdateProducts() {
  document.title = "Admin | Update Products";
  const id = useParams().id;
  const [check, setCheck] = useState(true);
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
  const [products, setProducts] = useState({
    name: "",
    producer: "",
    category: "",
    collections: "",
    color: "",
    description: "",
    importPrice: "",
    out_of_promotion: "",
    price: "",
    promotion: "",
  });
  useEffect(() => {
    const fetchBlog = async () => {
      const product = await productsAPI.edit(id);
      setProducts(product.data);
      setBuffer(product.data.sizes);
    };
    fetchBlog();
  }, []);
  const handleProducer = () => {
    const fetchAPI = async () => {
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
    fetchAPI();
  };
  const handleCollection = () => {
    setCheck(false);
    const fetchAPI = async () => {
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
    };
    fetchAPI();
  };
  const handleCategory = () => {
    const params = `collections?collection=${products.collections}`;
    const fetchAPI = async () => {
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
    };
    fetchAPI();
  };
  const handleColors = () => {
    setCheck(false);
    const fetchAPI = async () => {
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
    fetchAPI();
  };
  const handleSizes = () => {
    setCheck(false);
    const fetchAPI = async () => {
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
    fetchAPI();
  };
  console.log(products);
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
  const handleSubmit = async () => {
    setIsloading(true);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("image", files[i]);
    }
    data.append("name", products.name);
    data.append("producer", products.producer);
    data.append("collections", products.collections);
    data.append("category", products.category);
    data.append("color", products.color);
    data.append("importPrice", products.importPrice);
    data.append("price", products.price);
    data.append("promotion", products.promotion);
    data.append("out_of_promotion", products.out_of_promotion);
    buffer.map((item) => {
      data.append("size", item.size);
      data.append("quantity", item.quantity);
    });
    data.append("description", description);
    if (
      !products.name ||
      !products.importPrice ||
      !products.price ||
      !products.quantity ||
      !img ||
      !description
    ) {
      await productsAPI
        .update(id, data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Update product Sucssces", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
          setIsloading(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            toast.error("Please provide new image", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setIsloading(false);
          }
          if (err.response.status === 401) {
            toast.error("Product Name Has existed", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setIsloading(false);
          }
          if (err.response.status === 404) {
            toast.error("Can not find ID", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setIsloading(false);
          }
          if (err.response.status === 500) {
            toast.error("Connect Server False", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setIsloading(false);
          }
        });
    }
  };
  if (!products) return null;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("product-act")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className={cx("title")}>
                <h5>
                  <i className="fa fa-file"> Update Product</i>
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
                              value={products.name}
                              placeholder="Enter the product name"
                              onChange={(e) => {
                                setProducts({
                                  ...products,
                                  name: e.target.value,
                                });
                              }}
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
                              <select
                                name="producer"
                                id="producer"
                                onClick={handleProducer}
                                value={products.producer}
                                onChange={(e) => {
                                  setProducts({
                                    ...products,
                                    producer: e.target.value,
                                  });
                                }}
                              >
                                <option value={products.producer}>
                                  {products.producer}
                                </option>
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
                                onClick={handleCollection}
                                value={products.collections}
                                onChange={(e) => {
                                  setProducts({
                                    ...products,
                                    collections: e.target.value,
                                  });
                                }}
                              >
                                <option value={products.collections}>
                                  {products.collections}
                                </option>
                                {collections.map((item, index) => (
                                  <option value={item.collections} key={index}>
                                    {item.collections}
                                  </option>
                                ))}
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
                              <select
                                name="category"
                                id="category"
                                onClick={handleCategory}
                                disabled={check}
                                value={products.category}
                                onChange={(e) => {
                                  setProducts({
                                    ...products,
                                    category: e.target.value,
                                  });
                                }}
                              >
                                <option value={products.category}>
                                  {products.category}
                                </option>
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
                                onClick={handleColors}
                                value={products.color}
                                onChange={(e) => {
                                  setProducts({
                                    ...products,
                                    color: e.target.value,
                                  });
                                }}
                              >
                                <option value={products.color}>
                                  {products.color}
                                </option>
                                {colors.map((item, index) => (
                                  <option value={item.colors} key={index}>
                                    {item.colors}
                                  </option>
                                ))}
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
                                name="import_price"
                                id="import_price"
                                placeholder="0"
                                value={products.importPrice || ""}
                                onChange={(e) => {
                                  setProducts({
                                    ...products,
                                    importPrice: e.target.value,
                                  });
                                }}
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
                                name="price"
                                id="price"
                                placeholder="0"
                                value={products.price || ""}
                                onChange={(e) =>
                                  setProducts({
                                    ...products,
                                    price: e.target.value,
                                  })
                                }
                              />
                            </div>
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
                              <h5>Promotion</h5>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className={cx("input")}>
                              <input
                                type="text"
                                name="promotion"
                                id="promotion"
                                placeholder="0"
                                value={products.promotion || ""}
                                onChange={(e) => {
                                  setProducts({
                                    ...products,
                                    promotion: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className={cx("title")}>
                              <h5>Out of promotion</h5>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className={cx("input")}>
                              <input
                                type="date"
                                name="out_promotion"
                                id="out_promotion"
                                placeholder="0"
                                value={formatDate(products.out_of_promotion)}
                                onChange={(e) => {
                                  setProducts({
                                    ...products,
                                    out_of_promotion: e.target.value,
                                  });
                                }}
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
                                      onClick={handleSizes}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    >
                                      <option value={item.size}>
                                        {item.size}
                                      </option>
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
                        onEditorChange={(e) => {
                          setProducts({
                            ...products,
                            description: e,
                          });
                        }}
                        value={products.description}
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
export default UpdateProducts;