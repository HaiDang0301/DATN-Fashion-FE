import { Link } from "react-router-dom";
import className from "classnames/bind";
import styles from "./Update.module.scss";
import { useState } from "react";
const cx = className.bind(styles);
import noimg from "../../../../assets/noimg.png";
function UpdateBlogs() {
  document.title = "Admin | Edit Blog";
  const [image, setImage] = useState("");
  const handleChooseFile = (e) => {
    const url = e.target.files[0];
    setImage(url);
  };
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-10">
                <h5>Update Blog</h5>
              </div>
              <div className="col-lg-2">
                <Link to={"#"} className="btn btn-primary">
                  <i className="fa fa-edit"> Update</i>
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("blog-form")}>
            <div className={cx("nav-blog")}>
              <div className={cx("show-img")}>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="" />
                ) : (
                  <img src={noimg}></img>
                )}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("image")}>
                    <div className="row">
                      <div className="col-lg-2">
                        <h5>Image</h5>
                      </div>
                      <div className="col-lg-10">
                        <input
                          type="file"
                          name=""
                          id=""
                          onChange={handleChooseFile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("title-blogs")}>
                    <h5>Title Blogs</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter the title blog"
                  />
                </div>
                <div className="col-lg-12">
                  <div className={cx("author")}>
                    <h5>Author</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter the author blog"
                  />
                </div>
                <div className="col-lg-12">
                  <div className={cx("description")}>
                    <h5>Description</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <textarea
                    name="description"
                    rows="10"
                    placeholder="Enter the description"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlogs;
