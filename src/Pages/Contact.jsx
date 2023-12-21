import React, { useState } from 'react';
import Contactservice from '../appwrite/contactConfig';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            Contactservice.ContactMsg(formData); 
            toast.success('Query submitted successfully!');
            setTimeout(() => {
                navigate("/")
            },2000)
            // console.log('Form submitted successfully!');
        } catch (error) {
            toast.error('Error submitting form');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='bg-gradient-to-br from-green-200 via-cyan-200 to-pink-200'>
            <section className='py-20 px-10'>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
                        Contact Us
                    </h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-800  sm:text-xl">
                        Got a technical issue? Want to send feedback? Need
                        details about our website? Let us know.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your name"
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="Enter your email"
                            required
                        />
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={6}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Leave your message..."
                            required
                        />
                        <button
                            type="submit"
                            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Send message
                        </button>
                    </form>
                    <Toaster position='top-right' reverseOrder={false} />
                </div>
            </section>
        </div>
    );
};

export default Contact;
