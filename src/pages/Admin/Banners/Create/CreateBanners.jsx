import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import noimg from "../../../../assets/noimg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import className from "classnames/bind";
import styles from "./CreateBanners.module.scss";
import bannerApi from "../../../../api/Admin/bannerAPI";
import { useState } from "react";
const cx = className.bind(styles);
function CreateBanners() {
  document.title = "Admin | Create Banner";
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [hashtag, setHashTag] = useState();
  const [image, setImage] = useState();
  const handleSubmit = () => {
    if (!image) {
      toast.error("Please provide full information", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    } else {
      const data = new FormData();
      data.append("image", image);
      data.append("title", title);
      data.append("description", description);
      bannerApi
        .store(data)
        .then((res) => {
          if (res.data === "Add Banner Success") {
            toast.success("Tạo mới banner thành công", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            toast.error("Banner đã tồn tại", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
          if (error.response.status === 500) {
            toast.error("Lỗi Server", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
        });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-10 col-md-10 com-sm-9 col-9">
                <h5>Tạo mới banner</h5>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                <Link
                  to={"#"}
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  <i className="fa fa-save"> Lưu Thông Tin</i>
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("banner-form")}>
            <div className={cx("nav-banner")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("show-image")}>
                    {image ? (
                      <img src={URL.createObjectURL(image)} alt="" />
                    ) : (
                      <img src={noimg} alt="" />
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("image")}>
                    <h5>Hình Ảnh</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="col-lg-12">
                  <div className={cx("title-banner")}>
                    <h5>Tiêu Đề</h5>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      name="title"
                      id="tiele"
                      placeholder="Nhập tiêu đề"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("description-banner")}>
                    <h5>Mô Tả</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("editor")}>
                    <Editor
                      apiKey="ns9ltjxjky7crwvi0lq241xpborim7o4p8j36twsf0s7lxna"
                      value={description}
                      onEditorChange={(e) => setDescription(e)}
                      init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "quickbars",
                        ],
                        toolbar:
                          "undo redo | casechange blocks | bold italic backcolor | " +
                          "alignleft aligncenter alignright alignjustify | " +
                          "bullist numlist checklist | removeformat | quickimage",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateBanners;
