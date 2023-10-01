import { useNavigate, useParams } from "react-router-dom";
import loading from "../../../assets/loading.gif";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import styles from "./Reset.module.scss";
import { ToastContainer, toast } from "react-toastify";
import AuthsAPI from "../../../api/AuthsAPI";
import routesConfig from "../../../config/routes";
import { useState } from "react";
const cx = classNames.bind(styles);
function ResetPw() {
  document.title = "Reset Password";
  const [button, setButton] = useState(true);
  const [check, setCheck] = useState(false);
  const [isLoading, setIsloading] = useState();
  const token = useParams().token;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password is too short")
        .required("The password is empty"),
    }),
  });
  const handleSubmit = async () => {
    setButton(true);
    setCheck(true);
    setIsloading(
      <div className={cx("loading")}>
        <img src={loading} alt="" />
      </div>
    );
    const data = {
      password: formik.values.password,
    };
    if (token) {
      const reset = await AuthsAPI.reset(token, data)
        .then((res) => {
          if (res.data === "Reset Password Success") {
            toast.success(`Reset Password Success`, {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setCheck(false);
            setTimeout(() => {
              navigate(routesConfig.login);
            }, 5000);
          }
        })
        .catch((errors) => {
          toast.error("Expiring request please create new requirement", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        });
    } else {
      toast.error("Wrong Token", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("inner-reset")}>
        <div className={cx("reset-form-area")}>
          <div className={cx("reset-form")}>
            <div className={cx("reset-heading")}>
              <span>Reset Password</span>
              <p>Enter your password to reset</p>
            </div>
            <div className={cx("input-box")}>
              <div className={cx("single-input")}>
                <label htmlFor="">Password Adress</label>
                <input
                  onClick={(e) => setButton(false)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password Address"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={cx("errors")}>
                {formik.touched.password && formik.errors.password ? (
                  <>
                    <i className="fa fa-warning"> {formik.errors.password}</i>
                  </>
                ) : null}
              </div>
            </div>
            <div className={cx("forget-footer")}>
              {check ? (
                isLoading
              ) : (
                <button onClick={handleSubmit} disabled={button}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPw;
