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
            toast.success("Successful account registration", {
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
            toast.error("Connect SerVer Errors", {
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
                <h5>Email has been verifired</h5>
              </div>
              <div className="col-lg-12">
                <label htmlFor="">
                  <i className="fa fa-check"></i>
                </label>
              </div>
              <div className="col-lg-12">
                <span htmlFor="">You can now login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
