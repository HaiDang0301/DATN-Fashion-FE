import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles/GlobalStyle.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { store } from "./redux/store/store.jsx";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles>
        <GoogleOAuthProvider clientId="1044399197238-vdamn7g3ok73lh20dd7oo6ie1jd8a6dl.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </GlobalStyles>
    </BrowserRouter>
  </Provider>
);
