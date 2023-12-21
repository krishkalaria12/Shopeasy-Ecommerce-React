import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto">
        <p className="text-white text-center">
          Copyright &copy; Shopeasy 🤍 2023. All rights reserved.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center">

      <Link className="flex flex-row justify-start items-center" to="/contact">
        <span className="text-white">
        </span>
        <p className="text-white text-center m-5 ">Contact us</p>
      </Link>
      </div>
    </footer>
  );
};

export default Footer;