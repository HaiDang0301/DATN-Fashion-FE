import className from "classnames/bind";
import styles from "./Profile.module.scss";
import { useRef, useState } from "react";
const cx = className.bind(styles);
function Profile() {
  document.title = "Profile";
  const inputFiles = useRef();
  const [image, setImage] = useState();
  const handleChooseFile = () => {
    inputFiles.current.click();
  };
  const chooseImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
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
                  ) : (
                    <img
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt=""
                    />
                  )}
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
                <div className={cx("full-name")}>abc</div>
                <div className={cx("email")}>123@gmail.com</div>
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
                          <input type="text" name="" id="" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Email</h5>
                        </div>
                        <div className="col-lg-12">
                          <input type="text" name="email" id="email" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Phone Number</h5>
                        </div>
                        <div className="col-lg-12">
                          <input type="text" name="phone" id="phone" />
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
                          <h5>City</h5>
                        </div>
                        <div className="col-lg-12">
                          <select name="city" id="city">
                            <option value="">none</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Ward</h5>
                        </div>
                        <div className="col-lg-12">
                          <select name="ward" id="ward">
                            <option value="">none</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>District</h5>
                        </div>
                        <div className="col-lg-12">
                          <select name="district" id="district">
                            <option value="">none</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className={cx("title")}>
                          <h5>Adress Home</h5>
                        </div>
                        <div className="col-lg-12">
                          <input type="text" name="home" id="home" />
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
