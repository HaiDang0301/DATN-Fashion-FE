import { Link, useNavigate } from "react-router-dom";
import loading from "../../../assets/loading.gif";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import AuthsAPI from "../../../api/AuthsAPI";
import routesConfig from "../../../config/routes";
const cx = classNames.bind(styles);
function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [save, setSave] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter a password"),
    }),
  });
  const handleSubmit = async () => {
    setIsloading(true);
    const data = {
      email: formik.values.email,
      password: formik.values.password,
    };
    const login = await AuthsAPI.login(data)
      .then(async (res) => {
        if (save === true) {
          await localStorage.setItem("token", res.data.token);
        } else {
          await sessionStorage.setItem("token", res.data.token);
        }
        if (res.data.others.role === "admin") {
          toast.success("Loggin Succes", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setIsloading(false);
          setTimeout(() => {
            navigate(routesConfig.AdminHome);
          }, 2000);
        } else {
          toast.success("Loggin Succes", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setIsloading(false);
          setTimeout(() => {
            navigate(routesConfig.home);
          }, 3000);
        }
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          toast.error("Wrong account or password information", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        if (errors.response.status === 403) {
          toast.error("Your account has not been verified", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
        setIsloading(false);
      });
  };
  useEffect(() => {
    if (token) return navigate(routesConfig.home);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("inner-login")}>
        <div className={cx("login-form-area")}>
          <div className={cx("login-form")}>
            <div className={cx("login-heading")}>
              <span>Login</span>
              <p>Enter Login details to get access</p>
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
              <div className={cx("single-input")}>
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
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
              <div className={cx("login-check")}>
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                    <div className={cx("checkbox")}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onClick={(e) => setSave(!save)}
                      />
                      <label htmlFor="">Keep Me Logged In</label>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <Link to={routesConfig.forgetpw}>Forgot password ?</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("login-footer")}>
              <div className="row">
                <div className="col-lg-8">
                  <p>
                    Don’t have an account?
                    <Link to={routesConfig.register}> Sign Up </Link> here
                  </p>
                </div>
                <div className="col-lg-4">
                  {isloading ? (
                    <img src={loading} alt="" />
                  ) : (
                    <button onClick={handleSubmit}>Login</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
