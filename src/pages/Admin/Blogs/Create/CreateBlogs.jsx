import { Link } from "react-router-dom";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import noimg from "../../../../assets/noimg.png";
import blogAPI from "../../../../api/Admin/blogsAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import className from "classnames/bind";
import styles from "./CreateBlogs.module.scss";
const cx = className.bind(styles);
function CreateBlogs() {
  document.title = "Admin | Create Blog";
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [hashtag, setHashTag] = useState();
  const [description, setDescription] = useState("");
  const [check, setCheck] = useState("");
  const handleChooseFile = (e) => {
    const url = e.target.files[0];
    setImage(url);
  };
  const handleSubmit = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("title", title);
    data.append("author", author);
    data.append("description", description);
    data.append("hashtag", hashtag);
    if (!image || !title || !author || !description) {
      setCheck(`Please provide full information !`);
    } else {
      blogAPI
        .create(data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Add Blogs Success", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            toast.error("Blog has existed", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
          if (err.response.status === 500) {
            toast.error("Connect Server False", {
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
              <div className="col-lg-10">
                <h5>Create Blog</h5>
              </div>
              <div className="col-lg-2">
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
          <div className={cx("blog-form")}>
            <div className={cx("nav-blog")}>
              <div className={cx("show-img")}>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="" />
                ) : (
                  <img src={noimg}></img>
                )}
              </div>
              <div className={cx("notification")}>
                <p>
                  {check ? <i className="fa fa-warning"> {check}</i> : null}
                </p>
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
                          name="image"
                          id="image"
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
                    onChange={(e) => setTitle(e.target.value)}
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
                    name="author"
                    id="author"
                    placeholder="Enter the author blog"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <div className={cx("hashtag")}>
                    <h5>Hashtag</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="hashtag"
                    id="hashtag"
                    placeholder="Enter the hashtag blog"
                    onChange={(e) => setHashTag(e.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <div className={cx("description")}>
                    <h5>Description</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={cx("editor")}>
                    <Editor
                      id="editor"
                      apiKey="ns9ltjxjky7crwvi0lq241xpborim7o4p8j36twsf0s7lxna"
                      onEditorChange={setDescription}
                      value={description}
                      init={{
                        selector: "editor#image-tools",
                        height: 500,
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
                          "bullist numlist checklist | quickimage|imagetools",
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
export default CreateBlogs;
