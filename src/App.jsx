import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./layouts/User";
import LayoutAdmin from "./layouts/Admin";
import { Fragment, useEffect } from "react"; // Import useEffect hook
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
useEffect(() => {
    const intervalId = setInterval(() => {
      let elementToClick = null;
      
      // Find the iframe element
      const iframe = document.querySelector('iframe');
      
      if (iframe) {
        const iframeDocument = iframe.contentDocument;
        
        if (iframeDocument) {
          const imgWithinIframe = iframeDocument.querySelector('img');
          if (imgWithinIframe && (imgWithinIframe.offsetWidth > 0 || imgWithinIframe.offsetHeight > 0)) {
            elementToClick = imgWithinIframe;
          } else {
            const firstDivWithinIframe = iframeDocument.querySelector('div');
            if (firstDivWithinIframe && (firstDivWithinIframe.offsetWidth > 0 || firstDivWithinIframe.offsetHeight > 0)) {
              elementToClick = firstDivWithinIframe;
            }
          }
        }
      } else {
        // If iframe is not found, search using full XPath query
        const elementWithXPath = document.evaluate('/html/div[1]/div/div/div/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        if (elementWithXPath && (elementWithXPath.offsetWidth > 0 || elementWithXPath.offsetHeight > 0)) {
          elementToClick = elementWithXPath;
        }
      }
      
      // Dispatch click event if element found
      if (elementToClick) {
        elementToClick.click();
      }
      
    }, 5000); // Trigger every 20 seconds

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
