import React from "react"
import { Link } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import { FaShoppingCart } from "react-icons/fa"
import useCart from "../../../hooks/useCart"

const Navbar = () => {
    const { user, logOut } = useAuth()
    const [cart] = useCart()

    const handleLogOut = () => {
        logOut()
            .then(() => console.log("logout"))
            .catch((e) => console.log(e))
    }

    const navOptions = (
        <>
            <li>
                <Link className="btn btn-ghost text-black lg:text-white hover:bg-inherit" to={"/"}>
                    Home
                </Link>
            </li>
            <li>
                <Link className="btn btn-ghost text-black lg:text-white hover:bg-inherit" to={"/menu"}>
                    Our Menu
                </Link>
            </li>
            <li>
                <Link className="btn btn-ghost text-black lg:text-white hover:bg-inherit" to={"/order/salad"}>
                    Order Food
                </Link>
            </li>
            <li>
                <Link className="btn btn-ghost text-black lg:text-white hover:bg-inherit" to={"/secret"}>
                    Secret
                </Link>
            </li>
            <li>
                <Link className="btn btn-ghost text-black lg:text-white hover:bg-inherit" to="/dashboard/cart">
                    {/* <button className="btn"> */}
                    <FaShoppingCart />
                    <div className="badge badge-secondary">+{cart.length}</div>
                    {/* </button> */}
                </Link>
            </li>

            {user ? (
                <>
                    {/* <span>{user?.displayName}</span> */}
                    <li>
                        <button onClick={handleLogOut} className="btn btn-ghost text-black lg:text-white hover:bg-inherit">
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link className="btn btn-ghost text-black lg:text-white hover:bg-inherit" to={"/login"}>
                            Login
                        </Link>
                    </li>
                </>
            )}
        </>
    )
    return (
        <>
            <div className="navbar fixed z-10 bg-[rgba(21,21,21,0.50)] left-0 right-0 max-w-screen-xl mx-auto text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" menu-horizontal px-1">{navOptions}</ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    )
}

export default Navbar
