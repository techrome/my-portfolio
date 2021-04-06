import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

const WithLayout = (WrappedComponent) => ({ ...props }) => {
  return (
    <div>
      <Navbar />
      <WrappedComponent {...props} />
      <Footer />
    </div>
  );
};

export default WithLayout;
