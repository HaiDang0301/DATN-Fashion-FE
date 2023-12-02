import className from "classnames/bind";
import styles from "./Cart.module.scss";
import { useEffect, useState } from "react";
import cartAPI from "../../../api/User/cartAPI";
import AuthsAPI from "../../../api/AuthsAPI";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetCart } from "../../../features/AddToCart/AddToCart";
import { useNavigate } from "react-router-dom";
import routesConfig from "../../../config/routes";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const cx = className.bind(styles);
var amount = 0;
var totalAmount = 0;
var discount = 0;
var shipping = 0;
var arrCart = [];
function CartDetail() {
  document.title = "My Cart";
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [carts, setCarts] = useState([
    {
      image: "",
      price: "",
      product_id: "",
      product_name: "",
      quantity: "",
      size: "",
    },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [quantity, setQuantity] = useState();
  const [totals, setTotals] = useState(0);
  const [cities, setCities] = useState([]);
  const [disabledW, setDisableW] = useState(true);
  const [disabledH, setDisableH] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [disabledD, setDisableD] = useState(true);
  const [wards, setWards] = useState([]);
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState({
    address: { city: "", district: "", ward: "", address_home: "" },
    phone: "",
    full_name: "",
    email: "",
  });
  useEffect(() => {
    if (!token) {
      navigate(routesConfig.login);
    }
    const fetchProfile = async () => {
      const result = await AuthsAPI.profile();
      setUser(result.data);
      if (result.data.registered === true) {
        discount = 10;
      } else {
        discount = 0;
      }
    };
    const fetchCart = async () => {
      const result = await cartAPI.index(token);
      if (result.data) {
        let sum = 0;
        let total = 0;
        result.data.carts.map((quantity) => {
          sum += Number(quantity.quantity);
          total += Number(quantity.price * quantity.quantity);
        });
        setQuantity(sum);
        setTotals(total);
        if (total && total < 2000000) {
          shipping = 25000;
          totalAmount = total - (total * discount) / 100 + shipping;
          amount = totalAmount;
        } else {
          shipping = 0;
          totalAmount = total - (total * discount) / 100 + shipping;
          amount = totalAmount;
        }
      }
      setCarts(result.data.carts);
      arrCart = result.data.carts;
    };
    const fetchCity = async () => {
      setDisableD(true);
      await axios
        .get(`https://provinces.open-api.vn/api/?depth=2`)
        .then(async (item) => {
          setCities(item.data);
        })
        .then(async (d) => {
          const district = await axios.get(
            `https://provinces.open-api.vn/api/d/?depth=2`
          );
          setDistricts(district.data);
        })
        .then(async (w) => {
          const ward = await axios.get(
            `https://provinces.open-api.vn/api/w/?depth=2`
          );
          setWards(ward.data);
        });
    };
    if (success) {
      toast.success("Thanh toán thành công", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    }
    fetchProfile();
    fetchCity();
    fetchCart();
  }, [status, success]);
  const changeCity = async (e) => {
    setDisableD(false);
    setUser({
      ...user,
      address: {
        city: e.target.value,
        district: "",
        ward: "",
        address_home: "",
      },
    });
    const city = await e.target.value;
    if (city) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/p/${city}?depth=2`
      );
      setDistricts(result.data.districts);
    } else {
      setDistricts();
      setDisableD(true);
      setWards();
      setDisableW(true);
    }
  };
  const changeDistrict = async (e) => {
    setUser({
      ...user,
      address: {
        city: user.address.city,
        district: e.target.value,
        ward: "",
        address_home: "",
      },
    });
    const district = await e.target.value;
    if (district) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/d/${district}?depth=2`
      );
      setWards(result.data.wards);
      setDisableW(false);
    } else {
      setWards();
      setDisableW(true);
    }
  };
  const changeWard = (e) => {
    setUser({
      ...user,
      address: {
        city: user.address.city,
        district: user.address.district,
        ward: e.target.value,
        address_home: "",
      },
    });
    setDisableH(false);
  };
  const handleMinus = (index, quantity) => {
    if (quantity > 1) {
      let data = [...carts];
      data[index].quantity = quantity - 1;
      setCarts(data);
      let total = 0;
      carts.map((item) => {
        total += item.quantity * item.price;
      });
      setTotals(total);
      if (total && total < 2000000) {
        shipping = 25000;
      } else {
        shipping = 0;
      }
      totalAmount = total - (total * discount) / 100 + shipping;
      amount = totalAmount;
    }
  };
  const handlePlus = (index, quantity) => {
    let data = [...carts];
    data[index].quantity = quantity + 1;
    setCarts(data);
    let total = 0;
    carts.map((item) => {
      total += item.quantity * item.price;
    });
    setTotals(total);
    if (total && total < 2000000) {
      shipping = 25000;
    } else {
      shipping = 0;
    }
    totalAmount = total - (total * discount) / 100 + shipping;
    amount = totalAmount;
  };
  const handleDestroy = (product_id) => {
    cartAPI
      .destroy(product_id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Xóa sản phẩm khỏi giỏ hàng thành công", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
          const actions = resetCart();
          dispatch(actions);
          setStatus(!status);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.success("Lỗi Server", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
  };
  const handleOrder = async () => {
    if (
      !user.phone ||
      !user.address.city ||
      !user.address.district ||
      !user.address.ward ||
      !user.address.address_home
    ) {
      toast.warning("Vui lòng cung cấp đầy đủ thông tin nhận hàng", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    } else {
      const data = {
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        carts: carts,
        totalMoney: totals - (totals * discount) / 100,
      };
      cartAPI
        .orders(data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Đặt hàng thành công", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setDisable(true);
            setStatus(!status);
            const actions = resetCart();
            dispatch(actions);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error("Lỗi Server", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setDisable(true);
          }
        });
    }
  };
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Clothes",
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
        request_shipping_address: true,
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      const shippingAddress = details.purchase_units[0].shipping.address;
      const address = {
        city: shippingAddress.country_code,
        district: shippingAddress.admin_area_1,
        ward: shippingAddress.admin_area_2,
        address_home: shippingAddress.address_line_1,
      };
      const data = {
        phone: shippingAddress.postal_code,
        carts: arrCart,
        full_name: details.purchase_units[0].shipping.name.full_name,
        totalMoney: amount,
        address: address,
        typePayment: "online",
      };
      cartAPI
        .payment(data)
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
          }
          const actions = resetCart();
          dispatch(actions);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error("Lỗi Server", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
          }
        });
    });
  };
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className={cx("checkout")}>
          <div className="row">
            <div className="col-lg-12">
              <div className={cx("title")}>
                <h5>
                  Bạn có {quantity ? quantity : 0} sản phẩm trong giỏ hàng{" "}
                </h5>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              {carts
                ? carts.map((item, index) => (
                    <div className={cx("box-item")} key={index}>
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                            <div className={cx("image")}>
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className={cx("information")}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className={cx("product-name")}>
                                    {item.product_name}
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className={cx("size")}>
                                    Kích Thước : {item.size}
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className={cx("price")}>
                                    Giá : {Number(item.price).toLocaleString()}{" "}
                                    đ
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className={cx("total-price")}>
                                    Tổng Tiền :{" "}
                                    {Number(
                                      item.price * item.quantity
                                    ).toLocaleString()}{" "}
                                    đ
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                            <div className="row g-0">
                              <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                <div className={cx("quantity")}>
                                  {item.quantity}
                                </div>
                              </div>
                              <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                <div className={cx("change-quantity")}>
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className={cx("btn-plus")}>
                                        <button
                                          onClick={(e) =>
                                            handlePlus(index, item.quantity)
                                          }
                                        >
                                          <i className="fa fa-sort-up"></i>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className={cx("btn-minus")}>
                                        <button
                                          onClick={(e) =>
                                            handleMinus(index, item.quantity)
                                          }
                                        >
                                          <i className="fa fa-sort-down"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                            <div className={cx("destroy")}>
                              <button
                                onClick={(e) => handleDestroy(item.product_id)}
                              >
                                <i className="fa fa-close"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12">
              <div className={cx("checkout-form")}>
                <div className="container">
                  <div className={cx("shipping")}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className={cx("title-shipping")}>
                          <span>Địa Chỉ Nhận Hàng</span>
                        </div>
                      </div>
                      <div className={cx("address")}>
                        <div className={cx("name")}>
                          <div className="row">
                            <div className="col-lg-4">
                              <span>Tên</span>
                            </div>
                            <div className="col-lg-8">
                              <input
                                type="text"
                                name=""
                                id=""
                                value={user.full_name}
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    full_name: e.target.value,
                                  })
                                }
                              />
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
                                value={user.email}
                                onChange={(e) => {
                                  "";
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={cx("phone")}>
                          <div className="row">
                            <div className="col-lg-4">
                              <span>Số Điện Thoại</span>
                            </div>
                            <div className="col-lg-8">
                              <input
                                type="text"
                                name=""
                                id=""
                                value={user.phone || ""}
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className={cx("city")}>
                          <div className="row">
                            <div className="col-lg-4">
                              <span>Thành Phố / Tỉnh</span>
                            </div>
                            <div className="col-lg-8">
                              <select
                                name="city"
                                id="city"
                                value={
                                  user.address && user.address.city
                                    ? user.address.city
                                    : ""
                                }
                                onChange={(e) => changeCity(e)}
                              >
                                <option value=""></option>
                                {cities
                                  ? cities.map((item, index) => (
                                      <option value={item.code} key={index}>
                                        {item.name}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className={cx("district")}>
                          <div className="row">
                            <div className="col-lg-4">
                              <span>Quận / Huyện</span>
                            </div>
                            <div className="col-lg-8">
                              <select
                                name="district"
                                id="district"
                                value={
                                  user.address && user.address.district
                                    ? user.address.district
                                    : ""
                                }
                                disabled={disabledD}
                                onChange={(e) => {
                                  changeDistrict(e);
                                }}
                              >
                                <option value=""></option>
                                {districts
                                  ? districts.map((item, index) => (
                                      <option value={item.code} key={index}>
                                        {item.name}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className={cx("wards")}>
                          <div className="row">
                            <div className="col-lg-4">
                              <span>Phường / Xã</span>
                            </div>
                            <div className="col-lg-8">
                              <select
                                name="wards"
                                id="wards"
                                value={
                                  user.address && user.address.ward
                                    ? user.address.ward
                                    : ""
                                }
                                disabled={disabledW}
                                onChange={(e) => {
                                  changeWard(e);
                                }}
                              >
                                <option value=""></option>
                                {wards
                                  ? wards.map((item, index) => (
                                      <option value={item.code} key={index}>
                                        {item.name}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className={cx("address-home")}>
                          <div className="row">
                            <div className={cx("col-lg-4")}>
                              <span>Đia Chỉ Nhà</span>
                            </div>
                            <div className="col-lg-8">
                              <input
                                disabled={disabledH}
                                type="text"
                                name="home"
                                id="home"
                                value={
                                  user.address && user.address.address_home
                                    ? user.address.address_home
                                    : ""
                                }
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    address: {
                                      city: user.address.city,
                                      district: user.address.district,
                                      ward: user.address.ward,
                                      address_home: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("subtotal")}>
                    <div className="row">
                      <div className="col-lg-3">
                        <span>Tổng</span>
                      </div>
                      <div className="col-lg-9">
                        <div className={cx("money")}>
                          {Number(totals).toLocaleString()} đ
                        </div>
                      </div>
                    </div>
                  </div>
                  {discount ? (
                    <div className={cx("discount")}>
                      <div className="row">
                        <div className="col-lg-3">
                          <span>Giảm giá</span>
                        </div>
                        <div className="col-lg-9">
                          <div className={cx("discount-money")}>
                            {discount} %
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {shipping ? (
                    <div className={cx("delivery-charges")}>
                      <div className="row">
                        <div className="col-lg-6">
                          <span>Phí Vận Chuyển</span>
                        </div>
                        <div className="col-lg-6">
                          <div className={cx("delivery-money")}>
                            {Number(shipping).toLocaleString()} đ
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={cx("delivery-charges")}>
                      <div className="row">
                        <div className="col-lg-6">
                          <span>Phí Vận Chuyển</span>
                        </div>
                        <div className="col-lg-6">
                          <div className={cx("delivery-money")}>Miễn Phí</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={cx("grand-money")}>
                    <div className="row">
                      <div className="col-lg-6">
                        <span>Tổng Tiền</span>
                      </div>
                      <div className="col-lg-6">
                        <div className={cx("money")}>
                          {Number(
                            totals - (totals * discount) / 100 + shipping
                          ).toLocaleString()}{" "}
                          đ
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("btn-checkout")}>
                    <button
                      disabled={disable}
                      onClick={(e) => {
                        handleOrder();
                      }}
                    >
                      Thanh Toán Khi Nhận Hàng
                    </button>
                  </div>
                  <div className={cx("paypal")}>
                    <PayPalScriptProvider
                      options={{
                        clientId:
                          "AYnafvzxoVRVEGORcHEHsJImFbMjh1J-y3HvnQGjhJG7LC9fA5qK0bSSCVgclRfDJTVGlGiOJN13Hjjs",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                      />
                    </PayPalScriptProvider>
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
