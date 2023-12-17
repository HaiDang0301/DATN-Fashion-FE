import React from "react";
import classNames from "classnames/bind";
import styles from "./Contacts.module.scss";
const cx = classNames.bind(styles);
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
document.title = "Liên Hệ"
const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Contacts() {
  document.title = "Contacts";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={cx("wrapper")}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      ></GoogleMap>
      <div className={cx("contacts")}>
        <div className={cx("information")}>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className={cx("text")}>
                <h5>Thông Tin</h5>
                <h1>Liên Hệ Với Chúng Tôi</h1>
                <p>
                  Chúng tôi rất vui khi có thể nhận được sự góp ý phản hồi từ
                  bạn!
                </p>
                <h4>Địa chỉ</h4>
                <p>
                  Số 5 – Ngách 2 – Ngọc Đình – Hồng Dương – Thanh Oai – Hà Nội.
                </p>
                <p>+84 345-649-255</p>
                <h4>Email Liên Hệ</h4>
                <p>fashionlanhuong@gmail.com</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-lg-6">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Tên của bạn"
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="col-lg-12">
                  <textarea
                    name="messange"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Nội dung phản hồi"
                  ></textarea>
                </div>
                <div className="col-lg-6 col-sm-4">
                  <button>Gửi Phản Hồi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Contacts;
