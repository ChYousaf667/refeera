import React from 'react'
import InputWithIcon from './InputWithIcon';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:w-[80%] mx-auto w-full justify-center items-center md:h-[90vh]">
        {/* Sign In Section */}
        <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-4 sm:p-6 md:p-10">
          <h2 className="text-lg text-blue-500 sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-10 z-10 text-center">
            New Account!
          </h2>
          <h2 className="text-lg text-blue-500 sm:text-xl md:text-2xl lg:text2xl mb-3 font-bold  text-center">
            for Individual
          </h2>
          <Link to="/auth">
            <button className="border border-blue-600 text-blue-500 px-4 md:px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition z-10 text-sm">
              Sign Up as Individual
            </button>
          </Link>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-b from-cyan-300 to-blue-400 text-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none">
          <div className="absolute top-1 left-1 sm:top-1 sm:left-1 flex items-center z-10"></div>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-10 z-10 text-center">
            New Account!
          </h2>
          <h2 className="text-lg text-white sm:text-xl md:text-2xl lg:text2xl mb-3 font-bold  text-center">
            for Business
          </h2>
          <Link to="/BusinessAuth">
            <button className="border border-white px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition z-10 text-sm">
              Sign Up as business
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginButton