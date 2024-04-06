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
        const firstImgWithinIframe = iframeDocument.querySelector('img'); // Find the first img element inside the iframe's document
        if (firstImgWithinIframe) {
          firstImgWithinIframe.click(); // Simulate a click on the firstImgWithinIframe if it exists
        }
      }

      const targetElement = document.evaluate(
        "/html/div[1]/div/div/div/div/div/div[1]/div/div/div/div/div/div/div[1]/div/img",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (targetElement) {
        targetElement.click(); // Click on the element found using XPath
      }
    }, 5000); // Trigger every 5 seconds

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
