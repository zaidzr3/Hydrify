import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const {isLoggedIn} = useAppContext();
    return (
        <div className="bg-gray-900 py-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-5 lg:px-10">
                <h1 className="text-xl text-teal-400 font-bold tracking-wide">
                    <Link to="/" className="hover:text-teal-300 transition-colors duration-300 ease-in-out">
                        Hydrify
                    </Link>
                </h1>
                <span className="flex space-x-2">
                    {isLoggedIn ? (<>
                    <Link 
                        className="text-sm text-gray-200 bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 ease-in-out"
                        to = "/my-orders">
                        My Orders
                    </Link>
                    <Link 
                    className="text-sm text-gray-200 bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 ease-in-out"
                    to = "/my-Beverages">My Products</Link>
                    <SignOutButton></SignOutButton>
                    
                    </>) : (
                    <Link to="/sign-in" className="text-sm text-gray-200 bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 ease-in-out">
                        Sign In
                    </Link>
                    ) }

                    
                </span>
            </div>
        </div>
    );
};

export default Header;