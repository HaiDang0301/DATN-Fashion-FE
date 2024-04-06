import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./layouts/User";
import LayoutAdmin from "./layouts/Admin";
import { Fragment } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  useEffect(() => {
    const intervalId = setInterval(checkAndClickIframe, 5000);
    return () => clearInterval(intervalId);
  }, []);

  function checkAndClickIframe() {
    const firstIframe = document.querySelector("iframe");
    if (firstIframe) {
      console.log(122)
      firstIframe.contentWindow.document.body.click();
    }
  }

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          const Page = route.component;
          if (route.layout) {
            Layout = DefaultLayout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}
        {privateRoutes.map((route, index) => {
          let Layout = LayoutAdmin;
          const Page = route.component;
          if (route.layout) {
            Layout = LayoutAdmin;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
