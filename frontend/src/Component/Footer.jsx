import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="bg-dark text-light p-3 w-100 text-center"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0
        }}
      >
        <p className="text-capitalize">
          developed by
          <a href="https://github.com/mihir183" className="text-light">
            @mihir183
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
