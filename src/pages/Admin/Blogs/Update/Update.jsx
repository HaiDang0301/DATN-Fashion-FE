import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import blogAPI from "../../../../api/Admin/blogsAPI";
import className from "classnames/bind";
import styles from "./Update.module.scss";
import loading from "../../../../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify";
const cx = className.bind(styles);
function UpdateBlogs() {
  document.title = "Admin | Edit Blog";
  const id = useParams().id;
  const [image, setImage] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState({
    image: "",
    title: "",
    author: "",
    description: "",
    hashtag: "",
  });
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await blogAPI.edit(id);
      setBlog(blog.data);
    };
    fetchBlog();
  }, []);
  const handleChooseFile = (e) => {
    const url = e.target.files[0];
    setImage(url);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("image", image);
    data.append("title", blog.title);
    data.append("author", blog.author);
    data.append("hashtag", blog.hashtag);
    data.append("description", blog.description);
    await blogAPI.update(id, data).then((res) => {
      if (res.status === 200) {
        toast.success("Cập nhật bài viết thành công", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
        setIsLoading(false);
      }
      if (res.data === "Can't Find Blog") {
        toast.error("Không tìm thấy bài viết", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        });
        setIsLoading(false);
      }
    });
  };
  if (!blog) return null;
  return (
    <div className={cx("wrapper")}>
      <ToastContainer></ToastContainer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-10 col-md-9 com-sm-9 col-8">
                <h5>Cập nhật bài viết</h5>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-3 col-4">
                {isloading ? (
                  <img src={loading} alt="" />
                ) : (
                  <Link
                    to={"#"}
                    className="btn btn-primary"
                    onClick={handleUpdate}
                  >
                    <i className="fa fa-edit"> Lưu thông tin</i>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className={cx("blog-form")}>
            <div className={cx("nav-blog")}>
              <div className={cx("show-img")}>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="" />
                ) : (
                  <img src={blog.image}></img>
                )}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className={cx("image")}>
                    <div className="row">
                      <div className="col-lg-2">
                        <h5>Hình Ảnh</h5>
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
                    <h5>Tiêu Đề Bài Viết</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onClick={handleEdit}
                    placeholder="Tiêu đề bài viết"
                    value={blog.title}
                    onChange={(e) =>
                      setBlog({ ...blog, title: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!blog.title ? (
                    <i className="fa fa-warning"> Please provide title blog</i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("author")}>
                    <h5>Tác Giả</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    placeholder="Tác giả bài viết"
                    value={blog.author}
                    onChange={(e) =>
                      setBlog({ ...blog, author: e.target.value })
                    }
                  />
                </div>
                <div className="col-lg-12">
                  <div className={cx("hashtag")}>
                    <h5>Từ Khóa Tìm Kiếm</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Từ khóa tìm kiếm"
                    value={blog.hashtag}
                    onChange={(e) =>
                      setBlog({ ...blog, hashtag: e.target.value })
                    }
                  />
                </div>
                <div className={cx("errors")}>
                  {!blog.author ? (
                    <i className="fa fa-warning"> Please provide author blog</i>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className={cx("description")}>
                    <h5>Mô Tả</h5>
                  </div>
                </div>
                <div className="col-lg-12">
                  <Editor
                    apiKey="ns9ltjxjky7crwvi0lq241xpborim7o4p8j36twsf0s7lxna"
                    value={blog.description}
                    onEditorChange={(e) => {
                      setBlog({ ...blog, description: e });
                    }}
                    init={{
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
                        "bullist numlist checklist | removeformat | quickimage",
                    }}
                  />
                </div>
                <div className={cx("errors")}>
                  {!blog.description ? (
                    <i className="fa fa-warning">
                      {" "}
                      Please provide description blog
                    </i>
                  ) : null}
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
