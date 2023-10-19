import className from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useRef, useState } from "react";
import AuthsAPI from "../../../api/AuthsAPI";
import axios from "axios";
const cx = className.bind(styles);
function Profile() {
  document.title = "Profile";
  const inputFiles = useRef();
  const [image, setImage] = useState();
  const [user, setUser] = useState({
    address: [],
    cart: [],
    createdAt: "",
    email: "",
    full_name: "",
    password: "",
  });
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();
  const [disabledD, setDisableD] = useState(true);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState();
  const [disabledW, setDisableW] = useState(true);
  const [name, setName] = useState();
  const [addresshome, setAddressHome] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await AuthsAPI.profile();
      setUser(result.data);
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
  const fetchCity = async () => {
    setDisableD(true);
    const result = await axios
      .get("https://provinces.open-api.vn/api/?depth=2")
      .then(async (item) => {
        setCities(item.data);
      });
  };
  const changeCity = async (e) => {
    setDisableD(false);
    const city = await e.target.value;
    if (city) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/p/${city}?depth=2`
      );
      setDistricts(result.data.districts);
      setCity(e.target.value);
      setDistrict(result.data.districts[0].code);
    } else {
      setDistricts();
      setDisableD(true);
      setWards();
      setDisableW(true);
    }
  };
  const changeDistrict = async (e) => {
    const district = await e.target.value;
    if (district) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/d/${district}?depth=2`
      );
      setWards(result.data.wards);
      setDistrict(e.target.value);
      setWard(result.data.wards[0].code);
      setDisableW(false);
    } else {
      setWards();
      setDisableW(true);
    }
  };
  if (!user) return null;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("profile")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className={cx("avatar")}>
                <div className={cx("img-avatar")}>
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="" />
                  ) : user ? (
                    <img src={user.image} alt="" />
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Password</h5>
                        </div>
                        <div className="col-lg-12">
                          <input type="text" name="password" id="password" />
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
                            disabled={disabledW}
                            onChange={(e) => {
                              setWard(e.target.value);
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
                            type="text"
                            name="home"
                            id="home"
                            onChange={(e) => {
                              setAddressHome(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className={cx("save-information")}>
                  <button className="btn btn-primary">Save</button>
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
