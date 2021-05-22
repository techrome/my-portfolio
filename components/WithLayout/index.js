import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

const WithLayout =
  (WrappedComponent) =>
  ({ ...props }) => {
    return (
      <>
        <Navbar />
        <main>
          <WrappedComponent {...props} />
        </main>
        <Footer />
      </>
    );
  };

export default WithLayout;
