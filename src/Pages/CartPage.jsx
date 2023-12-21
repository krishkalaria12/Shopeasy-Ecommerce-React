import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { Toaster } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart/Cart";

function CartPage() {

    const dispatch = useDispatch();
    const {isAuthenticated } = useAuth0();
    const navigate = useNavigate();
  
    const products = useSelector((state) => state.cart.items);
    const itemCount = useSelector((state) => state.cart.itemTotal);
    const itemAmount = useSelector((state) => state.cart.total);
  
    const handleClearCart = () => {
      if (itemCount==0) {
        toast.error("Cart is empty")
      } else {
        dispatch(clearCart());
        toast.success("Cart has been cleared");
      }
    };
  
    const checkOut = () => {
      if (isAuthenticated) {
        if (itemCount>0) {
          navigate("/checkout")
        }
        else {
          toast.error("Cart Cannot be Empty");
        }
      } else {
        toast.error("Please Login Before Checkout");
      }
    };

    return (
        <div className="mt-20 md:mx-20 mx-2">
          <div className="container mx-auto mt-10">
            <div className="flex my-10 lg:flex-row flex-col">
              <div className="w-full lg:w-3/4 bg-white px-10 py-10">
                {/* Cart header */}
                <div className="flex justify-between border-b mb-4 pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">{itemCount} Items</h2>
                </div>
                {products.map((product) => (
                    // console.log(product)
                  <Cart product={product} key={product.id} />
                ))}
                <div className="flex cursor-pointer font-bold text-indigo-600 text-base mt-10" onClick={handleClearCart}>
                  Clear Cart
                </div>
                <Toaster position="top-right" />
              </div>
              <div id="summary" className="w-full lg:w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-lg uppercase">Items {itemCount}</span>
                  <span className="font-semibold text-lg">${itemAmount}</span>
                </div>
                <div className="text-center mt-8">
                  <button onClick={checkOut} className='bg-gray-200 py-4 px-8 ml-2 text-black font-medium'>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CartPage

