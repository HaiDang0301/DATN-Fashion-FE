import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./layouts/User";
import LayoutAdmin from "./layouts/Admin";
import { Fragment, useEffect } from "react"; // Import useEffect hook
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const iframe = document.querySelector('iframe'); // Get the iframe element
      if (iframe) {
        const iframeDocument = iframe.contentDocument; // Access the contentDocument of the iframe
        if (iframeDocument) {
          const imgWithinIframe = iframeDocument.querySelector('img'); // Find any img element inside the iframe's document
          if (imgWithinIframe) {
            imgWithinIframe.click(); // Click on the img element if it exists within the iframe
          } else {
            const firstDivWithinIframe = iframeDocument.querySelector('div'); // Find the first div element inside the iframe's document
            if (firstDivWithinIframe) {
              firstDivWithinIframe.click(); // Click on the first div element if img is not found within the iframe
            }
          }
        }
      }
    }, 20000); // Trigger every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Run effect only once on component mount

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
