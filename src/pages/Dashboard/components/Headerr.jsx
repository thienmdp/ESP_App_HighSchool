import React from "react";
import { GoBell } from "react-icons/go";
const Headerr = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <div>
                <h1 className="text-xs">Welcome Back!</h1>
                <p className="text-xl font-semibold">Alexia</p>
            </div>
            <div className="flex items-center space-x-5">
                <div className="hidden md:flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
                <div className="flex items-center space-x-5">
                    <button className="relative text-2xl text-gray-600 ">
                        <GoBell size={28} />
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white">
                            9
                        </span>
                    </button>
                    <img
                        className="w-8 h-8 rounded-full border-4 border-indigo-400"
                        src="https://randomuser.me/api/portraits/women/50.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default Headerr;