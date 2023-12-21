import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import Cart from "../Cart/Cart"
import { clearCart } from '../../store/cartSlice';
import shippingService from "../../appwrite/shippingConfig"
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function CheckoutPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const itemCount = useSelector((state) => state.cart.itemTotal);
    const {isAuthenticated, loginWithRedirect } = useAuth0();

    const [userData, setuserData] = useState({
        email: '',
        phone: '',
        name: '',
        address: '',
        city: '',
        country: '',
        postal: ''
    });

    // Function to handle input changes
    const postUserData = (e) => {
        const { name, value } = e.target;
        setuserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        if (itemCount < 0) {
            navigate("/")
            toast.error("Cart cannot be empty to checkout")
        }
    })

    const submitForm = (e) => {
        e.preventDefault();
        if (userData.postal.length!==6) {
                toast.error("Postal must be of 6 digits")
        } else {
            try {
                shippingService.ShippingInfo(userData)
                setuserData({
                    email: '',
                    phone: '',
                    name: '',
                    address: '',
                    city: '',
                    country: '',
                    postal: ''
                });
                toast.success('Order added successfully');
                setTimeout(() => {
                    navigate("/")
                    dispatch(clearCart());
                },2000)
            } catch (error) {
                toast.error("Error submitting order")
                console.error("Error while shipping info:", error);
            }
        }
    };

    const products = useSelector((state) => state.cart.items);
    const itemAmount = useSelector((state) => state.cart.total);

    return (
        <>
            {isAuthenticated ? 
            <div className=" mx-auto relative pt-24">
            <Toaster position='top-right' />
            <h1 className="text-4xl text-center font-bold mb-4 px-3">Checkout</h1>
            <div className="block w-full justify-center items-center md:flex mb-3 p-3">
                {/* checkout items */}
                    <div className=" sm:order-last min-w-[30rem] mb-10 lg:mb-0 md:ml-10 lg:ml-24 p-4 sm:p-6 bg-gray-200 fit-content-height rounded-2xl">
                    {/* Grid */}
                    {products.map((product) => (
                        <Cart product={product} key={product.id} />
                    ))}

                    {/* End grid */}
                    <div className="mt-20">
                        <div className="flex items-center justify-between border-t-2 py-2">
                            <span className="font-bold text-gray-800 text-2xl">
                                Shipping
                            </span>
                            <span className="font-bold text-gray-800 text-lg">$19</span>
                        </div>
                        <div className="flex items-center justify-between border-t-2 py-2">
                            <span className="font-bold text-gray-800 text-2xl">
                                Total
                            </span>
                            <span className="font-bold text-gray-800 text-lg">
                                ${parseInt(itemAmount + 19)}
                            </span>
                        </div>
                    </div>
                </div>
                {/* end checkout items */}
                {/* form */}
                <div className="max-w-4xl mr-5 lg:mr-10">
                <form name="checkoutForm" onSubmit={submitForm}>
                    <h3 className="text-lg font-bold mb-3">Contact information</h3>
                    <div className="relative mb-4">
                    <label
                        className="block text-left text-gray-700 text-sm font-semibold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-8 text-gray-700 leading-tight border-gray-800 focus:outline-none focus:shadow-outline font-semibold"
                        id="email"
                        type="email"
                        placeholder="Enter your email..."
                        required=""
                        value={userData.email}
                        onChange={postUserData}
                        name="email"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 py-1 mt-5">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-mail"
                        >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>
                    </div>
                    <div className="relative mb-10">
                    <label
                        className="block text-gray-700 text-left text-sm font-semibold mb-2"
                        htmlFor="email"
                    >
                        Phone
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-8 text-gray-700 leading-tight border-gray-800 focus:outline-none focus:shadow-outline font-semibold"
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone..."
                        required=""
                        value={userData.phone}
                        onChange={postUserData}
                        name="phone"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 py-1 mt-5">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-phone"
                        >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2 mb-3">
                    Shipping address
                    </h3>
                    <div className="relative mb-4">
                    <label
                        className="block text-gray-700 text-left text-sm font-semibold mb-2"
                        htmlFor="name"
                    >
                        Full name
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-8 text-gray-700 leading-tight border-gray-800 focus:outline-none focus:shadow-outline placeholder-gray-500 font-semibold"
                        id="name"
                        value={userData.name}
                        onChange={postUserData}
                        type="text"
                        placeholder="Your name"
                        required
                        name="name"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 py-1 mt-5">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-2"
                        >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 1 0-16 0" />
                        </svg>
                    </div>
                    </div>
                    <div className="relative mb-4">
                    <label
                        className="block text-gray-700 text-left text-sm font-semibold mb-2"
                        htmlFor="address"
                    >
                        Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-8 text-gray-700 leading-tight border-gray-800 focus:outline-none focus:shadow-outline placeholder-gray-500 font-semibold"
                        id="address"
                        value={userData.address}
                        onChange={postUserData}
                        type="text"
                        placeholder="Your address..."
                        required=""
                        name="address"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 py-1 mt-5">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-home"
                        >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    </div>
                    <div className="relative mb-4">
                    <label
                        className="block text-gray-700 text-left text-sm font-semibold mb-2"
                        htmlFor="city"
                    >
                        City
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-8 text-gray-700 leading-tight border-gray-800 focus:outline-none focus:shadow-outline placeholder-gray-500 font-semibold"
                        id="city"
                        type="text"
                        placeholder="Your city..."
                        required
                        value={userData.city}
                        onChange={postUserData}
                        name="city"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 py-1 mt-5">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pinned"
                        >
                        <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
                        <circle cx="12" cy="8" r="2" />
                        <path d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835" />
                        </svg>
                    </div>
                    </div>
                    <div className="flex mb-4">
                    <div className="relative flex-1">
                        <label
                        className="block text-gray-700 text-left text-sm font-semibold mb-2"
                        htmlFor="country"
                        >
                        Country
                        </label>
                        <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-8 text-gray-700 leading-tight border-gray-800 focus:outline-none focus:shadow-outline placeholder-gray-500 font-semibold"
                        id="country"
                        type="text"
                        placeholder="Country"
                        required
                        value={userData.country}
                        onChange={postUserData}
                        name="country"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-2 py-1 mt-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-map"
                        >
                            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                            <line x1="9" x2="9" y1="3" y2="18" />
                            <line x1="15" x2="15" y1="6" y2="21" />
                        </svg>
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 py-1 mt-5"></div>
                    </div>
                    <div className="relative ml-6 flex-1">
                        <label
                        className="block text-gray-700 text-left  text-sm font-semibold mb-2"
                        htmlFor="postal-code"
                        >
                        Postal Code
                        </label>
                        <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-8 text-gray-700 leading-tight border-gray-800 focus:outline-none focus:shadow-outline placeholder-gray-500 font-semibold"
                        type="text"
                        id="postal-code"
                        placeholder="Your postal code..."
                        required
                        
                        value={userData.postal}
                        onChange={postUserData}
                        name="postal"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-2 py-1 mt-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-navigation"
                        >
                            <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                        </div>
                    </div>
                    </div>

                    <div className="flex justify-end">
                    <button
                        className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg"
                        type="submit"
                        id="submitted"
                    >
                        Continue
                    </button>
                    </div>
                </form>
                </div>
                {/* end form */}
            </div>
            <div id="demo" />
            </div>
        : <div onClick={() => loginWithRedirect()} className='h-screen cursor-pointer flex flex-col justify-center items-center'> <div className='bg-black rounded text-white font-medium p-2'>Please Login</div></div>
    }
        </>
    )
}

export default CheckoutPage