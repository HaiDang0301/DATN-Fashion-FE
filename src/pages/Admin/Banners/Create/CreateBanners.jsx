import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import className from "classnames/bind";
import styles from "./CreateBanners.module.scss";
import { useFormik } from "formik";
import bannerApi from "../../../../api/Admin/bannerAPI";
import { useState } from "react";
const cx = className.bind(styles);
function CreateBanners() {
  document.title = "Admin | Create Banner";
  const [image, setImage] = useState();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter title producer"),
    }),
  });
  const handleSubmit = () => {
    if (formik.errors.title) {
      toast.error("Please provide title", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
      if (!image) {
        toast.error("Please provide image", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    } else {
      const data = new FormData();
      data.append("image", image);
      data.append("title", formik.values.title);
      bannerApi
        .store(data)
        .then((res) => {
          if (res.data === "Add Banner Success") {
            toast.success("Add Banner Success", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
        })
        .catch((err) => {
          toast.error("Connect Server False", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-10 col-md-10 com-sm-9 col-9">
                <h5>Create Banner</h5>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-3">
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
          <div className={cx("banner-form")}>
            <div className={cx("nav-banner")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("name-banner")}>
                    <h5>Title</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter the title banner"
                    value={formik.values.title}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={cx("errors")}>
                  {formik.touched.title && formik.errors.title ? (
                    <>
                      <i className="fa fa-warning"> {formik.errors.title}</i>
                    </>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("adress")}>
                    <h5>Image</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateBanners;
