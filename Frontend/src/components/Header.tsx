import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Adjust the pixel width to match Tailwind's 'md:' breakpoint
        setIsNavVisible(false); // Automatically hide the menu when the screen is wide enough
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="bg-gray-900 py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-5 lg:px-10">
        <h1 className="text-lg md:text-xl text-gray-300 font-bold">
          <Link to="/home" className="hover:text-gray-400 transition-colors duration-300 ease-in-out">
            Hydrify
          </Link>
        </h1>
        <div className="flex items-center">
          <button onClick={toggleNav} className="text-gray-200 focus:outline-none md:hidden">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className={`${isNavVisible ? 'flex' : 'hidden'} md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-center`}>
            <Link
              className="text-sm text-gray-200 bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 ease-in-out"
              to="/calorieCalculator"
            >
              My Calories
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  className="text-sm text-gray-200 bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                  to="/my-orders"
                >
                  My Orders
                </Link>
                <Link
                  className="text-sm text-gray-200 bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                  to="/my-Beverages"
                >
                  My Products
                </Link>
                <Link
                  className="text-sm text-gray-200 bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                  to="/my-orders"
                >
                  Cart
                </Link>
                <SignOutButton/>
              </>
            ) : (
              <Link
                className="text-sm text-gray-200 bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                to="/sign-in"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;