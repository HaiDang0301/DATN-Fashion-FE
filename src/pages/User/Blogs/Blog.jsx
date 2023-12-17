import Card from "react-bootstrap/Card";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import blogAPI from "../../../api/User/blogsAPI";
import className from "classnames/bind";
import loading from "../../../assets/loading.gif";
import styles from "./Blog.module.scss";
import Skeleton from "react-loading-skeleton";
const cx = className.bind(styles);
function Blogs() {
  document.title = "Bài Viết";
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState();
  const [btnsearch, setBtnSearch] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const params = searchParams;
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsList = await blogAPI.index(params);
      setBlogs(blogsList.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    fetchBlogs();
  }, [params]);
  const handleSearch = (e) => {
    setAuthor(e.target.value);
    setBtnSearch(false);
  };
  const hanldeBtnSearch = () => {
    setSearchParams({
      author: author,
    });
    setAPI(!api);
    setBtnSearch(!btnsearch);
  };
  const handlePage = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", e.selected + 1);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };
  const handleHashtag = (hashtag) => {
    setIsLoading(true);
    setSearchParams({
      hashtag: hashtag,
    });
    setAPI(!api);
  };
  if (!blogs.blogs) return null;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("breadcrumb-blog")}>
        <h1>Bài Viết</h1>
      </div>
      <div className={cx("blogs")}>
        <div className={cx("item-blog")}>
          <div className="row">
            <div className="col-lg-3 col-sm-4">
              <div className={cx("blog-sidebar")}>
                <div className={cx("search-blog")}>
                  <h3>Tìm Kiếm</h3>
                  <div className={cx("search")}>
                    <input
                      type="search"
                      placeholder="Tìm kiếm tác giả . . ."
                      onChange={handleSearch}
                    />
                    <button disabled={btnsearch} onClick={hanldeBtnSearch}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className={cx("item-hashtag")}>
                  <h3>Từ Khóa</h3>
                  <ul>
                    <div className="row g-0">
                      {blogs
                        ? blogs.hashtag.map((item, index) => (
                            <div className="col-lg-4" key={index}>
                              <li>
                                <button onClick={(e) => handleHashtag(item)}>
                                  # {item}
                                </button>
                              </li>
                            </div>
                          ))
                        : null}
                    </div>
                  </ul>
                </div>
                <div className={cx("recent-post")}>
                  <h3>Bài Viết Gần Đây</h3>
                  {blogs.blogs.slice(10, 16).map((item, index) => (
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
                            {isloading ? (
                              <div className={cx("isloading")}>
                                <img src={loading} alt="" />
                              </div>
                            ) : (
                              <Card.Img variant="top" src={item.image} />
                            )}
                            <Card.Body>
                              {isloading ? (
                                <Skeleton
                                  count={2}
                                  width={380}
                                  height={20}
                                ></Skeleton>
                              ) : (
                                <Card.Title className={cx("card-title")}>
                                  {item.title}
                                </Card.Title>
                              )}
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
                  forcePage={searchParams.get("page") - 1}
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
