import React from "react";
import classNames from "classnames/bind";
import styles from "./Contacts.module.scss";
const cx = classNames.bind(styles);
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

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
                <h5>INFORMATION</h5>
                <h1>Contact Us</h1>
                <p>
                  As you might expect of a company that began as a high-end
                  interiors contractor, we pay strict attention.
                </p>
                <h4>VietNam</h4>
                <p>Trung Van, Tu Liem, Hanoi, Vietnam</p>
                <p>+84 345-649-255</p>
                <h4>Mail Support</h4>
                <p>dinhhaidang1003@gmail.com</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-lg-6">
                  <input type="text" name="name" id="name" placeholder="Name" />
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
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="col-lg-6 col-sm-4">
                  <button>SEND MESSAGE</button>
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
