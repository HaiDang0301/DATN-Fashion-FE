import { Link, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import className from "classnames/bind";
import styles from "./Update.module.scss";
import bannerApi from "../../../../api/Admin/bannerAPI";
import { useEffect, useState } from "react";
const cx = className.bind(styles);
function UpdateBanners() {
  document.title = "Admin | Update Banner";
  const [image, setImage] = useState();
  const [banner, setBanner] = useState({
    image: "",
    title: "",
    description: "",
  });
  const id = useParams().id;
  useEffect(() => {
    const fetchApi = async () => {
      const result = await bannerApi.edit(id);
      setBanner(result.data);
    };
    fetchApi();
  }, []);
  const handleSubmit = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("title", banner.title);
    data.append("description", banner.description);
    bannerApi
      .update(id, data)
      .then((res) => {
        if (res.data === "Update Banner Success") {
          toast.success("Cập nhật banner thành công", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.error("Lỗi Server", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
      });
  };
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-10 col-md-10 com-sm-9 col-9">
                <h5>Cập nhật banner</h5>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                <Link
                  to={"#"}
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  <i className="fa fa-save"> Lưu Thông tin</i>
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("banner-form")}>
            <div className={cx("nav-banner")}>
              <div className="row">
                <div className={cx("show-image")}>
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="" />
                  ) : (
                    <img src={banner.image} alt="" />
                  )}
                </div>
                <div className="col-lg-12">
                  <div className={cx("adress")}>
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
                  <div className={cx("name-banner")}>
                    <h5>Tiêu Đề</h5>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={banner.title}
                      placeholder="Nhập Tiêu Đề Banner"
                      onChange={(e) =>
                        setBanner({ ...banner, title: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <h5>Mô Tả</h5>
                </div>
                <div className="col-lg-12">
                  <Editor
                    apiKey="ns9ltjxjky7crwvi0lq241xpborim7o4p8j36twsf0s7lxna"
                    value={banner.description}
                    onEditorChange={(e) => {
                      setBanner({ ...banner, description: e });
                    }}
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
  );
}
export default UpdateBanners;
