import React from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { addItem } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import toast ,{ Toaster } from "react-hot-toast";

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const addtoCart = () => {
    dispatch(addItem({product}));
    toast.success("Added to cart")
  }


  const { id, image, category, title, price } = product;
  return (
    <>
      <Toaster position="top-right" />
      <div className="text-center">
        <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
          <div className="w-full h-full flex justify-center items-center">
            {/* image */}
            <Link to={`/product/${id}`} className="w-[200px] mx-auto flex justify-center items-center">
              <img
                className="max-h-[160px] group-hover:scale-110 transition duration-300"
                src={image}
                alt=""
              />
            </Link>
          </div>
          {/* buttons */}
          <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button onClick={addtoCart}>
              <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                <BsPlus className="text-3xl" />
              </div>
            </button>
            <Link
              to={`/product/${id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            >
              <BsEyeFill />
            </Link>
          </div>
        </div>
        {/* category, title & price */}
        <div>
          <div className="tex-sm capitalize font-semibold text-gray-500 mb-1">{category}</div>
          <Link to={`/product/${id}`}>
            <h2 className="font-bold mb-1">{title}</h2>
          </Link>

          <h2 className="font-semibold">$ {parseInt(price)}</h2>
        </div>
      </div>
    </>
  );
};

export default Product;