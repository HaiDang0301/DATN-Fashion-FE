import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import routesConfig from "../../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
const cx = classNames.bind(styles);
function Register() {
  document.title = "Register";
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(20, "Maximum of 10 characters")
        .required("Please provide full name"),
      email: Yup.string().required("Email must not leave blank"),
      password: Yup.string()
        .min(6, "Password is too short")
        .required("The password is empty"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password incorrect")
        .required("Please confirm the password"),
    }),
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner-register")}>
        <div className={cx("register-form-area")}>
          <div className={cx("register-form")}>
            <div className={cx("register-heading")}>
              <span>Sign Up</span>
              <p>Create your account to get full access</p>
            </div>
            <div className={cx("input-box")}>
              <div className={cx("single-input")}>
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  placeholder="Enter Full Name"
                  value={formik.values.full_name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={cx("errors")}>
                {formik.touched.full_name && formik.errors.full_name ? (
                  <>
                    <i className="fa fa-warning"> {formik.errors.full_name}</i>
                  </>
                ) : null}
              </div>
              <div className={cx("single-input")}>
                <label htmlFor="">Email Adress</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
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
                  placeholder="Enter Password"
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
              <div className={cx("single-input")}>
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  value={formik.values.confirm_password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={cx("errors")}>
                {formik.touched.confirm_password &&
                formik.errors.confirm_password ? (
                  <>
                    <i className="fa fa-warning">
                      {" "}
                      {formik.errors.confirm_password}
                    </i>
                  </>
                ) : null}
              </div>
            </div>
            <div className={cx("register-footer")}>
              <div className="row">
                <div className="col-lg-8">
                  <p>
                    Already have an account?
                    <Link to={routesConfig.login}>Login</Link>
                    here
                  </p>
                </div>
                <div className="col-lg-4">
                  <button>Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
