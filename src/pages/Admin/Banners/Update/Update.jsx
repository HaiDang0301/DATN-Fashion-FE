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
  const [banner, setBanner] = useState({ image: "", title: "" });
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
    bannerApi
      .update(id, data)
      .then((res) => {
        if (res.data === "Update Banner Success") {
          toast.success("Update Banner Success", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-10 col-md-10 com-sm-9 col-9">
                <h5>Create Banner</h5>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-3">
                <Link
                  to={"#"}
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  <i className="fa fa-save"> Save</i>
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("banner-form")}>
            <div className={cx("nav-banner")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("name-banner")}>
                    <h5>Title</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <Editor
                    apiKey="ns9ltjxjky7crwvi0lq241xpborim7o4p8j36twsf0s7lxna"
                    value={banner.title}
                    onEditorChange={(e) => {
                      setBanner({ ...banner, title: e });
                    }}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "a11ychecker",
                        "advlist",
                        "advcode",
                        "advtable",
                        "autolink",
                        "checklist",
                        "export",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "powerpaste",
                        "fullscreen",
                        "formatpainter",
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
                <div className="col-lg-12">
                  <div className={cx("adress")}>
                    <h5>Image</h5>
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
                <div className={cx("show-image")}>
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="" />
                  ) : (
                    <img src={banner.image} alt="" />
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
export default UpdateBanners;