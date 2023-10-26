import className from "classnames/bind";
import styles from "./Cart.module.scss";
const cx = className.bind(styles);
function CartDetail() {
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-12">
            <div className={cx("title")}>
              <h5>Your Cart (4 items)</h5>
            </div>
          </div>
          <div className="col-lg-12">
            <div className={cx("title-heading")}>
              <div className="row g-0">
                <div className="col-lg-6 col-md-6 col-sm-6 col-4">
                  <div className={cx("item")}>
                    <span>Item</span>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                  <div className={cx("price")}>
                    <span>Price</span>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                  <div className={cx("quantity")}>
                    <span>Quantity</span>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                  <div className={cx("total")}>
                    <span>Total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className={cx("cart-detail")}>
              <div className="row g-0">
                <div className="col-lg-6 col-md-6 col-sm-6 col-4">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                      Image
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-6">
                      <div className="row">
                        <div className="col-lg-12">Name</div>
                        <div className="col-lg-12">Size</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">$23</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-3">
                  <div className={cx("change-quantity")}>
                    <button className={cx("minus")}>
                      <i className="fa fa-minus"></i>
                    </button>
                    <input type="text" name="" id="" />
                    <button className={cx("plus")}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                  <div className={cx("total")}>
                    <div className="row g-0">
                      <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                        $23
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <button>
                          <i className="fa fa-close"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className={cx("checkout")}>
              <div className="row">
                <div className="col-lg-8">
                  <></>
                </div>
                <div className="col-lg-4">
                  <div className={cx("checkout-form")}>
                    <div className="container">
                      <div className={cx("shipping")}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className={cx("title-shipping")}>
                              <span>Shipping</span>
                            </div>
                          </div>
                          <div className={cx("address")}>
                            <div className={cx("name")}>
                              <div className="row">
                                <div className="col-lg-4">
                                  <span>Name</span>
                                </div>
                                <div className="col-lg-8">
                                  <input type="text" name="" id="" />
                                </div>
                              </div>
                            </div>
                            <div className={cx("email")}>
                              <div className="row">
                                <div className="col-lg-4">
                                  <span>Email</span>
                                </div>
                                <div className="col-lg-8">
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={cx("phone")}>
                              <div className="row">
                                <div className="col-lg-4">
                                  <span>Phone</span>
                                </div>
                                <div className="col-lg-8">
                                  <input type="text" name="" id="" />
                                </div>
                              </div>
                            </div>
                            <div className={cx("city")}>
                              <div className="row">
                                <div className="col-lg-4">
                                  <span>City</span>
                                </div>
                                <div className="col-lg-8">
                                  <select name="" id="">
                                    <option value=""></option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className={cx("district")}>
                              <div className="row">
                                <div className="col-lg-4">
                                  <span>District</span>
                                </div>
                                <div className="col-lg-8">
                                  <select name="" id="">
                                    <option value=""></option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className={cx("ward")}>
                              <div className="row">
                                <div className="col-lg-4">
                                  <span>Ward</span>
                                </div>
                                <div className="col-lg-8">
                                  <select name="" id="">
                                    <option value=""></option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("subtotal")}>
                        <div className="row">
                          <div className="col-lg-3">
                            <span>Subtotal</span>
                          </div>
                          <div className="col-lg-9">
                            <div className={cx("money")}>$23</div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("discount")}>
                        <div className="row">
                          <div className="col-lg-3">
                            <span>Discount</span>
                          </div>
                          <div className="col-lg-9">
                            <div className={cx("discount-money")}>5%</div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("grand-money")}>
                        <div className="row">
                          <div className="col-lg-6">
                            <span>Grand Money</span>
                          </div>
                          <div className="col-lg-6">
                            <div className={cx("money")}>5%</div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("btn-checkout")}>
                        <button>CHECK OUT</button>
                      </div>
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

export default CartDetail;
