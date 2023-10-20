import className from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AuthsAPI from "../../../api/AuthsAPI";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routesConfig from "../../../config/routes";
const cx = className.bind(styles);
function Profile() {
  document.title = "Profile";
  const navigate = useNavigate();
  const inputFiles = useRef();
  const [image, setImage] = useState();
  const [user, setUser] = useState({
    address: [{ city: "", district: "", ward: "", address_home: "" }],
    phone: "",
    full_name: "",
    email: "",
  });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [disabledD, setDisableD] = useState(true);
  const [wards, setWards] = useState([]);
  const [disabledW, setDisableW] = useState(true);
  const [disabledH, setDisableH] = useState(true);
  const [password, setPassword] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await AuthsAPI.profile().then((res) => {
        setUser(res.data);
      });
    };
    const fetchCity = async () => {
      setDisableD(true);
      const city = await axios
        .get(`https://provinces.open-api.vn/api/?depth=2`)
        .then(async (item) => {
          setCities(item.data);
        })
        .then(async (d) => {
          const district = await axios.get(
            `https://provinces.open-api.vn/api/d/?depth=2`
          );
          setDistricts(district.data);
        })
        .then(async (w) => {
          const ward = await axios.get(
            `https://provinces.open-api.vn/api/w/?depth=2`
          );
          setWards(ward.data);
        });
    };
    fetchApi();
    fetchCity();
  }, []);
  const handleChooseFile = () => {
    inputFiles.current.click();
  };
  const chooseImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const changeCity = async (e) => {
    setDisableD(false);
    setUser({
      ...user,
      address: [
        { city: e.target.value, district: "", ward: "", address_home: "" },
      ],
    });
    const city = await e.target.value;
    if (city) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/p/${city}?depth=2`
      );
      setDistricts(result.data.districts);
    } else {
      setDistricts();
      setDisableD(true);
      setWards();
      setDisableW(true);
    }
  };
  const changeDistrict = async (e) => {
    setUser({
      ...user,
      address: [
        {
          city: user.address[0].city,
          district: e.target.value,
          ward: "",
          address_home: "",
        },
      ],
    });
    const district = await e.target.value;
    if (district) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/d/${district}?depth=2`
      );
      setWards(result.data.wards);
      setDisableW(false);
    } else {
      setWards();
      setDisableW(true);
    }
  };
  const changeWard = (e) => {
    setUser({
      ...user,
      address: [
        {
          city: user.address[0].city,
          district: user.address[0].district,
          ward: e.target.value,
          address_home: "",
        },
      ],
    });
    setDisableH(false);
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("image", image);
    data.append("full_name", user.full_name);
    data.append("phone", user.phone);
    if (password) {
      data.append("password", password);
    }
    data.append("city", user.address[0].city);
    data.append("district", user.address[0].district);
    data.append("ward", user.address[0].ward);
    data.append("home", user.address[0].address_home);
    const update = await AuthsAPI.update(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Profile Success", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "light",
          });
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          setTimeout(() => {
            navigate(routesConfig.login);
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("Connect Server False", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      });
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className={cx("profile")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className={cx("avatar")}>
                <div className={cx("img-avatar")}>
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="" />
                  ) : user.image ? (
                    <img src={user.image[0].url} alt="" />
                  ) : null}
                  <div className={cx("choose-image")}>
                    <button onClick={handleChooseFile}>
                      <i className="fa fa-pencil"></i>
                    </button>
                  </div>
                  <div className={cx("choose-file")}>
                    <input
                      type="file"
                      ref={inputFiles}
                      onChange={chooseImage}
                    />
                  </div>
                </div>
                <div className={cx("full-name")}>
                  <h5>{user.full_name}</h5>
                </div>
                <div className={cx("email")}>{user.email}</div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className={cx("information")}>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Full name</h5>
                        </div>
                        <div className="col-lg-12">
                          <input
                            type="text"
                            name="full_name"
                            id="full_name"
                            value={user.full_name}
                            onChange={(e) =>
                              setUser({ ...user, full_name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Email</h5>
                        </div>
                        <div className="col-lg-12">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            disabled={true}
                            value={user.email}
                            onChange={(e) => {}}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Phone Number</h5>
                        </div>
                        <div className="col-lg-12">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={user.phone}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Password</h5>
                        </div>
                        <div className="col-lg-12">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Provines / City</h5>
                        </div>
                        <div className="col-lg-12">
                          <select
                            name="city"
                            id="city"
                            value={user.address[0].city}
                            onChange={(e) => changeCity(e)}
                          >
                            <option value=""></option>
                            {cities
                              ? cities.map((item, index) => (
                                  <option value={item.code} key={index}>
                                    {item.name}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>District</h5>
                        </div>
                        <div className="col-lg-12">
                          <select
                            name="district"
                            id="district"
                            value={user.address[0].district}
                            disabled={disabledD}
                            onChange={(e) => {
                              changeDistrict(e);
                            }}
                          >
                            <option value=""></option>
                            {districts
                              ? districts.map((item, index) => (
                                  <option value={item.code} key={index}>
                                    {item.name}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Ward</h5>
                        </div>
                        <div className="col-lg-12">
                          <select
                            name="ward"
                            id="ward"
                            value={user.address[0].ward}
                            disabled={disabledW}
                            onChange={(e) => {
                              changeWard(e);
                            }}
                          >
                            {wards
                              ? wards.map((item, index) => (
                                  <option value={item.code} key={index}>
                                    {item.name}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Adress Home</h5>
                        </div>
                        <div className="col-lg-12">
                          <input
                            disabled={disabledH}
                            type="text"
                            name="home"
                            id="home"
                            value={user.address[0].address_home}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: [
                                  {
                                    city: user.address[0].city,
                                    district: user.address[0].district,
                                    ward: user.address[0].ward,
                                    address_home: e.target.value,
                                  },
                                ],
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className={cx("save-information")}>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
