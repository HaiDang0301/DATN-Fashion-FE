import { useNavigate } from "react-router-dom";
import loading from "../../../assets/loading.gif";
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
  const [button, setButton] = useState(true);
  const [check, setCheck] = useState(false);
  const [isLoading, setIsloading] = useState();
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
    setButton(true);
    setCheck(true);
    setIsloading(
      <div className={cx("loading")}>
        <img src={loading} alt="" />
      </div>
    );
    const data = {
      email: formik.values.email,
    };
    const forget = await AuthsAPI.forget(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            "Yêu cầu đặt lại mật khẩu thành công vui lòng kiểm tra email",
            {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            }
          );
          setCheck(false);
          setButton(true);
          setTimeout(() => {
            setButton(false);
          }, 30000);
        }
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          toast.error("Vui lòng kiểm tra lại email của bạn", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
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
              <span>Quên Mật Khẩu</span>
              <p>Nhập Địa Chỉ Email Của Bạn Để Tạo Yêu Cầu Đặt Lại Mật Khẩu</p>
            </div>
            <div className={cx("input-box")}>
              <div className={cx("single-input")}>
                <label id="email">Địa Chỉ Email</label>
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
            </div>
            <div className={cx("forget-footer")}>
              {check ? (
                isLoading
              ) : (
                <button onClick={handleSubmit} disabled={button}>
                  Gửi Yêu Cầu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPw;
