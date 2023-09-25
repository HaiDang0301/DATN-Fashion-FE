import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import routesConfig from "../../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
function Login() {
  document.title = "Login";
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
  return (
    <div className={cx("wrapper")}>
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
                  <div className="col-lg-8 col-sm-12">
                    <div className={cx("checkbox")}>
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="">Keep Me Logged In</label>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <Link to="/">Forgot password ?</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("login-footer")}>
              <div className="row">
                <div className="col-lg-8">
                  <p>
                    Don’t have an account?
                    <Link to={routesConfig.register}>Sign Up </Link> here
                  </p>
                </div>
                <div className="col-lg-4">
                  <button>Login</button>
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
