import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { addItem } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import toast ,{ Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
    };
    fetchProducts();
  }, []);

  const product = products.find((item) => {
    return item.id === parseInt(id);
  });

  const addtoCart = () => {
    dispatch(addItem({product}));
    toast.success("Added to cart")
  }

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  // destructure product
  const { title, price, description, image } = product;
  return (

    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        {/* image and text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-xs" src={image} alt="" />
          </div>
          {/* text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
            <div className="text-2xl text-red-500 font-medium mb-6">$ {price}</div>
            <p className="mb-8">{description}</p>
            <button onClick={addtoCart} className='bg-primary py-4 px-8 text-black'>Add to cart</button>
            <Toaster position="top-right" />
            <Link to={"/cart"}>
              <button className='bg-gray-200 py-4 px-8 ml-2 text-black font-medium'>View Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;