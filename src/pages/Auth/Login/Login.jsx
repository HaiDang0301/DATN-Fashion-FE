import { Link, useNavigate } from "react-router-dom";
import loading from "../../../assets/loading.gif";
import { OldSocialLogin as SocialLogin } from "react-social-login";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import AuthsAPI from "../../../api/AuthsAPI";
import routesConfig from "../../../config/routes";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
const cx = classNames.bind(styles);
function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [save, setSave] = useState(false);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    if (token) return navigate(routesConfig.home);
  }, []);
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
    await AuthsAPI.login(data)
      .then(async (res) => {
        save
          ? localStorage.setItem("token", res.data.token)
          : sessionStorage.setItem("token", res.data.token);
        if (res.data.others.role === "admin") {
          toast.success("Loggin Succes", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "light",
          });
          setIsloading(false);
          setTimeout(() => {
            navigate(routesConfig.AdminHome);
          }, 2000);
        } else {
          toast.success("Loggin Succes", {
            position: "bottom-right",
            autoClose: 3000,
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
            autoClose: 3000,
            theme: "light",
          });
        }
        if (errors.response.status === 403) {
          toast.error("Your account has not been verified", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "light",
          });
        }
        if (err.response.status === 500) {
          toast.error("Connect Server Errors", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "light",
          });
        }
        setIsloading(false);
      });
  };
  const handleSocialLogin = async (user, err) => {
    const data = { access_token: user._token.accessToken };
    await AuthsAPI.authFacebook(data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          toast.success("Login Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          setTimeout(() => {
            navigate(routesConfig.home);
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Connect Server Errors", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };

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
                <label id="email">Email Adress</label>
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
                <label id="password">Password</label>
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
                      <label id="check">Keep Me Logged In</label>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <Link to={routesConfig.forgetpw}>Forgot password ?</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("social-login")}>
              <div className={cx("title-social")}>
                <label id="social-title">Other</label>
              </div>
              <div className={cx("btn-social")}>
                <GoogleLogin
                  locale="en"
                  type="icon"
                  onSuccess={(credentialResponse) => {
                    const details = jwtDecode(credentialResponse.credential);
                    const data = {
                      authType: "google",
                      authGoogleID: details.aud,
                      email: details.email,
                      full_name: details.name,
                      url: details.picture,
                    };
                    AuthsAPI.authGoogle(data)
                      .then((res) => {
                        localStorage.setItem("token", res.data);
                        if (res.status === 200) {
                          toast.success("Login Success", {
                            position: "bottom-right",
                            autoClose: 5000,
                            theme: "light",
                          });
                          setTimeout(() => {
                            navigate(routesConfig.home);
                          }, 3000);
                        }
                      })
                      .catch((err) => {
                        if (err.response.status === 500) {
                          toast.error("Connect Server Errors", {
                            position: "bottom-right",
                            autoClose: 5000,
                            theme: "light",
                          });
                        }
                      });
                  }}
                  onError={() => {
                    toast.error("Login Failed", {
                      position: "bottom-right",
                      autoClose: 5000,
                      theme: "light",
                    });
                  }}
                />
                <SocialLogin
                  provider="facebook"
                  appId="1439463896615085"
                  callback={handleSocialLogin}
                >
                  <button className={cx("facebook")}>
                    <i className="fa fa-facebook"></i>
                  </button>
                </SocialLogin>
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
