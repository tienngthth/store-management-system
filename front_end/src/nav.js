import React from 'react'

export default function NavBar(
    { setLoggedIn }
) {

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        setLoggedIn(false)
    }

    return (
        <nav className="bg-white border-gray-200  border-style:solid border-b-[1px] ">
            <div className="flex flex-wrap items-center justify-between mx-3 p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src='./shop.png' className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">Store House</span>
                </a>
                <div className="hidden w-full md:block md:w-auto mr-4" id="navbar-default">
                    <button type="button" onClick={logout} className="flex text-black  hover:text-blue-600/100 focus:outline-none font-medium rounded-lg text-sm py-2  focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}
