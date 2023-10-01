import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import className from "classnames/bind";
import styles from "./CreateProducers.module.scss";
import producersApi from "../../../../api/Admin/producersAPI";
import { useFormik } from "formik";
const cx = className.bind(styles);
function CreateProducers() {
  document.title = "Admin | Create Producer";
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter name producer"),
      email: Yup.string().required("Please enter email producer"),
      phone_number: Yup.string().required("Please enter phone number producer"),
      address: Yup.string().required("Please enter adress producer"),
    }),
  });
  const handleSubmit = () => {
    if (
      formik.errors.name ||
      formik.errors.email ||
      formik.errors.phone_number ||
      formik.errors.address
    ) {
      toast.error("Please provide full information", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    } else {
      const data = {
        name: formik.values.name,
        email: formik.values.email,
        phone_number: formik.values.phone_number,
        address: formik.values.address,
      };
      producersApi
        .createProducer(data)
        .then((res) => {
          if (res.data === "Add Producer Success") {
            toast.success("Add Producer Success", {
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
                <h5>Create Producer</h5>
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
          <div className={cx("producer-form")}>
            <div className={cx("nav-producer")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("name-producer")}>
                    <h5>Name Producer</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter the email producer"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={cx("errors")}>
                  {formik.touched.name && formik.errors.name ? (
                    <>
                      <i className="fa fa-warning"> {formik.errors.name}</i>
                    </>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("email-producer")}>
                    <h5>Email Producer</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter the email producer"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={cx("errors")}>
                  {formik.touched.email && formik.errors.email ? (
                    <>
                      <i className="fa fa-warning"> {formik.errors.email}</i>
                    </>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("phone")}>
                    <h5>Phone Number</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Enter the phone number producer"
                    value={formik.values.phone_number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={cx("errors")}>
                  {formik.touched.phone_number && formik.errors.phone_number ? (
                    <>
                      <i className="fa fa-warning">
                        {formik.errors.phone_number}
                      </i>
                    </>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("adress")}>
                    <h5>Adress</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter the adress producer"
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={cx("errors")}>
                  {formik.touched.address && formik.errors.address ? (
                    <>
                      <i className="fa fa-warning"> {formik.errors.address}</i>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateProducers;
