import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuth0();

    const handleLogout = () => {
        logout()
        navigate("/")
    }
    return (
        <>

            {isAuthenticated && <div>
                <section class="bg-gradient-to-b from-rose-200 via-pink-100 to-cyan-200 px-4 flex font-medium items-center justify-center h-screen">

                    <section class="mx-auto  sm:w-[45rem] bg-[#20354b] rounded-2xl px-2 md:px-8 py-6 shadow-lg">
                        <div className=' flex flex-col lg:space-y-0 space-y-4 lg:flex-row lg:space-x-6'>
                            <div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400 text-center text-lg">Profile</span>
                                </div>
                                <div class="mt-6 w-fit mx-auto">
                                    <img src={user.picture} class="rounded-full w-28 " alt="profile" srcSet="" />
                                </div>
                                <div onClick={() => handleLogout()} class="bg-emerald-400 py-1 cursor-pointer text-center w-[6rem] mx-auto rounded font-semibold mt-2.5" >
                                    Logout
                                </div>
                            </div>

                            <div class="mt-8 flex flex-col space-y-2">
                                <div className='flex flex-row items-center space-x-4'>
                                    <h2 class="text-gray-400 font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">UserName: </h2>
                                    <h2 class="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">{user.given_name} </h2>
                                </div>
                                <div className='flex flex-row items-center space-x-4'>
                                    <h2 class="text-gray-400 font-bold  text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">Last Name: </h2>
                                    <h2 class="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">{user.family_name} </h2>
                                </div>
                                <div className='flex flex-row items-center space-x-4'>
                                    <h2 class="text-gray-400 font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">Email: </h2>
                                    <h2 class="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">{user.email} </h2>
                                </div>
                                {user.phone_number && <div className='flex flex-row items-center space-x-4'>
                                    <h2 class="text-gray-400 font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">Phone Number: </h2>
                                    <h2 class="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">{user.phone_number} </h2>
                                </div>}
                            </div>
                        </div>
                        <div class="mt-3 text-center w-full text-white text-sm">
                            <div class="h-1 w-full mb-2 bg-black mt-8 rounded-full">
                                <div class="h-1 rounded-full  bg-yellow-500 "></div>
                            </div>
                            <span class="text-gray-400 font-semibold">Shopeasy | @KrishKalaria</span>
                            <span></span>
                        </div>
                    </section>


                </section>
            </div>}
        </>
    )
}

export default Profile