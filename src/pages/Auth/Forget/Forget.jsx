import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import styles from "./Forget.module.scss";
import { ToastContainer, toast } from "react-toastify";
import AuthsAPI from "../../../api/AuthsAPI";
import { useEffect, useState } from "react";
import routesConfig from "../../../config/routes";
const cx = classNames.bind(styles);
function ForgetPw() {
  document.title = "Forget Password";
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [button, setButton] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
    }),
  });
  const handleSubmit = async () => {
    const data = {
      email: formik.values.email,
    };
    const forget = await AuthsAPI.forget(data)
      .then((res) => {
        if (res.data.message === "Create a successful reset password") {
          toast.success("Success please check the email", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          toast.error("Please check the email again", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
    setButton(true);
    setTimeout(() => {
      setButton(false);
    }, 30000);
  };
  useEffect(() => {
    if (token) {
      navigate(routesConfig.home);
    }
  }, []);
  useEffect(() => {
    if (token) {
      navigate(routesConfig.home);
    }
  }, []);
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("inner-forget")}>
        <div className={cx("forget-form-area")}>
          <div className={cx("forget-form")}>
            <div className={cx("forget-heading")}>
              <span>Forget Password</span>
              <p>Enter your email to reset the password</p>
            </div>
            <div className={cx("input-box")}>
              <div className={cx("single-input")}>
                <label htmlFor="">Email Adress</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
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
            </div>
            <div className={cx("forget-footer")}>
              <button onClick={handleSubmit} disabled={button}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPw;
