import className from "classnames/bind";
import styles from "./Cart.module.scss";
import { useEffect, useState } from "react";
import cartAPI from "../../../api/User/cartAPI";
import AuthsAPI from "../../../api/AuthsAPI";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../features/AddToCart/AddToCart";
const cx = className.bind(styles);
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
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  const [total, setTotal] = useState();
  const [discount, setDiscount] = useState();
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
        setTotal(total);
      }
      setCarts(result.data.carts);
    };
    const fetchApi = async () => {
      const result = await AuthsAPI.profile(token);
      setUser(result.data);
      if (result.data.registered === true) {
        setDiscount(5);
      } else {
        setDiscount(0);
      }
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
    fetchApi();
    fetchCity();
    fetchCart();
  }, [status]);
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
      setTotal(total);
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
    setTotal(total);
  };
  const handleDestroy = (product_id) => {
    const data = { product_id: product_id };
    cartAPI
      .destroy(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Delete Success", {
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
          toast.success("Connect Server Error", {
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
      toast.warning("Please provide full information", {
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
      };
      cartAPI
        .orders(data)
        .then((res) => {
          if (res.status === 200) {
            toast.success(
              "Successful order, please wait for the admin to confirm your order",
              { position: "bottom-right", autoClose: 5000, theme: "light" }
            );
            setDisable(true);
            setStatus(!status);
            const actions = resetCart();
            dispatch(actions);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error("Connect Server Errors", {
              position: "bottom-right",
              autoClose: 5000,
              theme: "light",
            });
            setDisable(true);
          }
        });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className={cx("checkout")}>
          <div className="row">
            <div className="col-lg-12">
              <div className={cx("title")}>
                <h5>You have {quantity ? quantity : 0} items in your cart </h5>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-sm-12">
              {carts
                ? carts.map((item, index) => (
                    <div className={cx("box-item")} key={index}>
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-7">
                            <div className="row">
                              <div className="col-lg-4">
                                <div className={cx("image")}>
                                  <img src={item.image} alt="" />
                                </div>
                              </div>
                              <div className="col-lg-8">
                                <div className={cx("information")}>
                                  <div className="row">
                                    <div className="col-lg-12">
                                      {item.product_name}
                                    </div>
                                    <div className="col-lg-12">
                                      Size : {item.size}
                                    </div>
                                    <div className="col-lg-12">
                                      Price : $
                                      {Number(item.price).toLocaleString()}
                                    </div>
                                    <div className="col-lg-12">
                                      Total Price : $
                                      {Number(
                                        item.price * item.quantity
                                      ).toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="row g-0">
                              <div className="col-lg-1">
                                <div className={cx("quantity")}>
                                  {item.quantity}
                                </div>
                              </div>
                              <div className="col-lg-1">
                                <div className={cx("change-quantity")}>
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className={cx("btn-minus")}>
                                        <button
                                          onClick={(e) =>
                                            handleMinus(index, item.quantity)
                                          }
                                        >
                                          <i className="fa fa-sort-up"></i>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className={cx("btn-plus")}>
                                        <button
                                          onClick={(e) =>
                                            handlePlus(index, item.quantity)
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
                          <div className="col-lg-1">
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
            <div className="col-lg-4 col-md-5 col-sm-12">
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
                              <span>Phone</span>
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
                              <span>City</span>
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
                              <span>District</span>
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
                              <span>Ward</span>
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
                              <span>Adress Home</span>
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
                        <span>Subtotal</span>
                      </div>
                      <div className="col-lg-9">
                        <div className={cx("money")}>
                          ${Number(total).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  {discount ? (
                    <div className={cx("discount")}>
                      <div className="row">
                        <div className="col-lg-3">
                          <span>Discount</span>
                        </div>
                        <div className="col-lg-9">
                          <div className={cx("discount-money")}>
                            {discount} %
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className={cx("grand-money")}>
                    <div className="row">
                      <div className="col-lg-6">
                        <span>Grand Money</span>
                      </div>
                      <div className="col-lg-6">
                        <div className={cx("money")}>
                          $
                          {Number(
                            total - (total * discount) / 100
                          ).toLocaleString()}
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
                      CHECK OUT
                    </button>
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
