import { Link, useNavigate } from "react-router-dom";
import loading from "../../../assets/loading.gif";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import routesConfig from "../../../config/routes";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useEffect, useState } from "react";
import AuthsAPI from "../../../api/AuthsAPI";
const cx = classNames.bind(styles);
function Register() {
  document.title = "Register";
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [button, setButton] = useState(true);
  const [check, setCheck] = useState(false);
  const [isLoading, setIsloading] = useState();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Tối thiểu 2 ký tự")
        .max(20, "Tối đa 20 ký tự")
        .required("Vui lòng cung cấp đầy đủ họ và tên"),
      email: Yup.string().required("Vui lòng cung cấp email"),
      password: Yup.string()
        .min(6, "Mật khẩu quá ngắn")
        .required("Vui lòng cung cấp mật khẩu"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
        .required("Vui lòng xác nhận lại mật khẩu"),
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
    if (
      formik.errors.full_name ||
      formik.errors.email ||
      formik.errors.password ||
      formik.errors.confirm_password
    ) {
      toast.error("Please provide full information", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    } else {
      const data = {
        full_name: formik.values.full_name,
        email: formik.values.email,
        password: formik.values.password,
      };
      await AuthsAPI.register(data)
        .then((res) => {
          if (res.status === 200) {
            toast.success(
              "Đăng Ký Thành Công Vui Lòng Vào Email Để Xác Thực Tài Khoản",
              {
                position: "bottom-right",
                autoClose: 5000,
                theme: "light",
              }
            );
            setCheck(false);
          }
        })
        .catch((errors) => {
          if (errors.response.status === 409) {
            toast.error("Tài Khoản Đã Được Đăng Ký", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setCheck(false);
          }
          if (errors.response.status === 401) {
            toast.error("Vui Lòng Kiểm Tra Lại Email", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setCheck(false);
          }
          if (errors.response.status === 500) {
            toast.error("Lỗi Server", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setCheck(false);
          }
        });
    }
  };
  useEffect(() => {
    if (token) {
      navigate(routesConfig.home);
    }
  }, []);
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("inner-register")}>
        <div className={cx("register-form-area")}>
          <div className={cx("register-form")}>
            <div className={cx("register-heading")}>
              <span>Đăng Ký</span>
              <p>Tạo tài khoản của bạn để có quyền truy cập đầy đủ</p>
            </div>
            <div className={cx("input-box")}>
              <div className={cx("single-input")}>
                <label id="full_name">Họ và tên</label>
                <input
                  onClick={(e) => setButton(false)}
                  type="text"
                  id="full_name"
                  name="full_name"
                  placeholder="Họ và tên"
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
                <label id="email">Email Adress</label>
                <input
                  onClick={(e) => setButton(false)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Địa Chỉ Email"
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
                <label id="password">Mật Khẩu</label>
                <input
                  onClick={(e) => setButton(false)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mật Khẩu"
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
                <label id="confrim_password">Xác Nhận Mật Khẩu</label>
                <input
                  onClick={(e) => setButton(false)}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Xác Nhận Lại Mật Khẩu"
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
                    Bạn đã có tài khoản?
                    <Link to={routesConfig.login}> Đăng Nhập </Link>
                  </p>
                </div>
                <div className="col-lg-4">
                  {check ? (
                    isLoading
                  ) : (
                    <button onClick={handleSubmit} disabled={button}>
                      Đăng Ký
                    </button>
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

export default Register;
