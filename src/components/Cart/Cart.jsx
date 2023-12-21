import React from "react";
import { useDispatch } from "react-redux";
import {removeItem, increaseItemQuantity ,decreaseItemQuantity } from "../../store/cartSlice";
import toast from "react-hot-toast"

const Cart = ({product}) => {
  const dispatch = useDispatch();

  const removeProduct = ({product}) => {
    dispatch(removeItem({product}));
    toast.success("Product has been removed successfully from cart");
  }

  const increaseQuantity = (product) => {
    dispatch(increaseItemQuantity({ product }));
    toast.success("Product quantity increased in cart");
  };

  const decreaseQuantity = (product) => {
    if (product.quantity === 1) {
      removeProduct({product})
    } else {
      dispatch(decreaseItemQuantity({ product }));
      toast.success("Product quantity decreased in cart");
    }
  };

  return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img className="md:w-48 lg:w-32 w-60 mx-auto" src={product.image} alt="product-image"/>
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0 ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
                  <h4 className="text-base mt-8 text-gray-700">{product.category}</h4>
                </div>
                <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span onClick={() => decreaseQuantity(product)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                    <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number"  value={product.quantity} min="1" readOnly />
                    <span onClick={() => increaseQuantity(product)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold">${product.price}</p>
                    <span onClick={() => removeProduct({product})}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
  )
};

export default Cart;
