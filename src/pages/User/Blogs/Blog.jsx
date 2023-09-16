import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import styles from "./Blog.module.scss";
const cx = className.bind(styles);
import lt1 from "../../../assets/latest-1.jpg";
import lt2 from "../../../assets/latest-2.jpg";
import lt3 from "../../../assets/latest-3.jpg";
function Blogs() {
  document.title = "Blogs";
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
                    <input type="search" placeholder="Search . . ." />
                    <button>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className={cx("item-collections")}>
                  <h3>Collections</h3>
                  <ul>
                    <li>
                      <Link to={"#"}>Fashion</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Travel</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Picnic</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Model</Link>
                    </li>
                  </ul>
                </div>
                <div className={cx("recent-post")}>
                  <h3>Recent Post</h3>
                  <div className={cx("item")}>
                    <img src={lt1} alt="" />
                    <div className={cx("title")}>
                      <Link to={"#"}>
                        <p>The Personality Trait That Makes...</p>
                        <h5>FASHION - May 19,2023</h5>
                      </Link>
                    </div>
                  </div>
                  <div className={cx("item")}>
                    <img src={lt2} alt="" />
                    <div className={cx("title")}>
                      <Link to={"#"}>
                        <p>The Personality Trait That Makes...</p>
                        <h5>FASHION - May 19,2023</h5>
                      </Link>
                    </div>
                  </div>
                  <div className={cx("item")}>
                    <img src={lt3} alt="" />
                    <div className={cx("title")}>
                      <Link to={"#"}>
                        <p>The Personality Trait That Makes...</p>
                        <h5>FASHION - May 19,2023</h5>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={cx("product-tag")}>
                  <h3>Product Tags</h3>
                  <div className="row">
                    <div className="col-lg-4">
                      <Link to={"#"}>Towel</Link>
                    </div>
                    <div className="col-lg-4">
                      <Link to={"#"}>Shoes</Link>
                    </div>
                    <div className="col-lg-4">
                      <Link to={"#"}>Coat</Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <Link to={"#"}>Dresses</Link>
                    </div>
                    <div className="col-lg-4">
                      <Link to={"#"}>Trousers</Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      <Link to={"#"}>Men's hats</Link>
                    </div>
                    <div className="col-lg-5">
                      <Link to={"#"}>Backpack</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className={cx("blog")}>
                <div className={cx("card")}>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <Link to={"#"}>
                        <Card className={cx("item-card")}>
                          <Card.Img variant="top" src={lt1} />
                          <Card.Body>
                            <Card.Title className={cx("card-title")}>
                              The Best Street Style From London Fashion Week
                            </Card.Title>
                            <Card.Text>
                              Sed quia non numquam modi tempora indunt ut labore
                              et dolore magnam aliquam quaerat
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                    {/*  */}
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <Link to={"#"}>
                        <Card className={cx("item-card")}>
                          <Card.Img variant="top" src={lt2} />
                          <Card.Body>
                            <Card.Title className={cx("card-title")}>
                              Vogue's Ultimate Guide To Autumn/Winter 2019 Shoes
                            </Card.Title>
                            <Card.Text>
                              Sed quia non numquam modi tempora indunt ut labore
                              et dolore magnam aliquam quaerat
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                    {/*  */}
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <Link to={"#"}>
                        <Card className={cx("item-card")}>
                          <Card.Img variant="top" src={lt3} />
                          <Card.Body>
                            <Card.Title className={cx("card-title")}>
                              How To Brighten Your Wardrobe With A Dash Of Lime
                            </Card.Title>
                            <Card.Text>
                              Sed quia non numquam modi tempora indunt ut labore
                              et dolore magnam aliquam quaerat
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
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

export default Blogs;
