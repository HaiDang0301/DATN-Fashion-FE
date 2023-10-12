import Card from "react-bootstrap/Card";
import { Link, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import blogAPI from "../../../api/User/blogsAPI";
import Parser from "html-react-parser";
import className from "classnames/bind";
import styles from "./Blog.module.scss";
const cx = className.bind(styles);
function Blogs() {
  document.title = "Blogs";
  const year = new Date();
  const [api, setAPI] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [btnsearch, setBtnSearch] = useState(true);
  const params = searchParams;
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsList = await blogAPI.getAll(params);
      setBlogs(blogsList.data);
      setTimeout(() => {
        setAPI(true);
      }, 1000);
    };
    fetchBlogs();
  }, [api]);
  const handleSearch = (e) => {
    const author = e.target.value;
    setSearchParams({
      author: author,
    });
    setBtnSearch(false);
  };
  const hanldeBtnSearch = () => {
    setAPI(!api);
    setBtnSearch(!btnsearch);
  };
  const handlePage = (e) => {
    setAPI(!api);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const author = searchParams.get("author");
    const hashtag = searchParams.get("hashtag");
    const newPage = e.selected + 1;
    if (author) {
      setSearchParams({
        author: author,
        page: newPage,
      });
      if (hashtag) {
        setSearchParams({
          hashtag: hashtag,
          page: newPage,
        });
      }
    } else {
      setSearchParams({
        page: newPage,
      });
    }
  };
  const handleHashtag = () => {
    setAPI(!api);
  };
  if (!blogs.blogs) return null;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("breadcrumb-blog")}>
        <h1>Our Blog</h1>
      </div>
      <div className={cx("blogs")}>
        <div className={cx("item-blog")}>
          <div className="row">
            <div className="col-lg-3 col-sm-4">
              <div className={cx("blog-sidebar")}>
                <div className={cx("search-blog")}>
                  <h3>Search</h3>
                  <div className={cx("search")}>
                    <input
                      type="search"
                      placeholder="Search the author . . ."
                      onChange={handleSearch}
                    />
                    <button disabled={btnsearch} onClick={hanldeBtnSearch}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className={cx("item-hashtag")}>
                  <h3>HashTag</h3>
                  <ul>
                    <li>
                      <Link to={"/blogs/?hashtag=sale"} onClick={handleHashtag}>
                        Sale
                      </Link>
                    </li>
                    <li>
                      <Link to={"/blogs/?hashtag=new"} onClick={handleHashtag}>
                        New Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/blogs/?hashtag=celebrity"}
                        onClick={handleHashtag}
                      >
                        Celebrity
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/blogs/?hashtag=${year.getFullYear()}`}
                        onClick={handleHashtag}
                      >
                        {year.getFullYear()}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={cx("recent-post")}>
                  <h3>Recent Post</h3>
                  {blogs.blogs.slice(3, 6).map((item, index) => (
                    <div className={cx("item")} key={item._id}>
                      <img src={item.image} alt="" />
                      <div className={cx("title")}>
                        <Link to={item.slug}>
                          <label>{item.title.slice(0, 35) + ". . ."}</label>
                          <h5>FASHION - {item.createdAt.slice(0, 10)}</h5>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className={cx("blog")}>
                <div className={cx("card")}>
                  <div className="row">
                    {blogs.blogs.map((item, index) => (
                      <div
                        className="col-lg-4 col-md-6 col-sm-6"
                        key={item._id}
                      >
                        <Link to={item.slug}>
                          <Card className={cx("item-card")}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                              <Card.Title className={cx("card-title")}>
                                {item.title}
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cx("panigate")}>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePage}
                  pageCount={blogs.totalPage || 1}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
