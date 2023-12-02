import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Verify.module.scss";
import { useEffect } from "react";
import AuthsAPI from "../../../api/AuthsAPI";
import { toast } from "react-toastify";
import routesConfig from "../../../config/routes";
const cx = classNames.bind(styles);
function Verify() {
  const params = useParams().token;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVerify = async () => {
      await AuthsAPI.verify(params)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Xác Thực Tài Khoản Thành Công", {
              position: "bottom-right",
              autoClose: 2000,
              theme: "light",
            });
          }
          setTimeout(() => {
            navigate(routesConfig.login);
          }, 5000);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error("Lỗi Server", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
        });
    };
    fetchVerify();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("notification")}>
        <div className="container">
          <div className={cx("notification-form")}>
            <div className="row">
              <div className="col-lg-12">
                <h5>Tài Khoản Của Bạn Đã Được Xác Thực</h5>
              </div>
              <div className="col-lg-12">
                <label id="check">
                  <i className="fa fa-check"></i>
                </label>
              </div>
              <div className="col-lg-12">
                <span htmlFor="">Bạn Có Thể Đăng Nhập Ngay Bây Giờ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
