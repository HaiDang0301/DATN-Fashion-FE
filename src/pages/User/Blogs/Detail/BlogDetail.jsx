import { useParams } from "react-router-dom";
import Parser from "html-react-parser";
import className from "classnames/bind";
import styles from "./BlogDetail.module.scss";
import { useEffect, useState } from "react";
import blogAPI from "../../../../api/User/blogsAPI";
import formatDate from "../../../../formatDate/formatDate";
const cx = className.bind(styles);
function BlogsDetail() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const params = useParams().slug;
  const [blog, setBlog] = useState([]);
  document.title = `${blog.title}`;
  useEffect(() => {
    const fetchDetail = async () => {
      const blogDetail = await blogAPI.showDetail(params);
      setBlog(blogDetail.data);
    };
    fetchDetail();
  }, []);
  if (!blog) return null;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={cx("title")}>
                <h1>{blog.title}</h1>
              </div>
            </div>
            <div className="col-lg-12">
              <div className={cx("author")}>
                <i className="fa fa-user">
                  <p>{blog.author}</p>
                  <label>
                    - {blog.createdAt ? formatDate(blog.createdAt) : null}
                  </label>
                </i>
              </div>
            </div>
            <div className="col-lg-12">
              <div className={cx("description")}>
                {blog.description ? Parser(blog.description) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsDetail;
