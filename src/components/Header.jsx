import React, { useContext } from 'react';
import { FaVideo, FaBell, FaMicrophone } from 'react-icons/fa';
import buttons from './../assets/buttons.png';
import VideoContext from '../context/VideoContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(VideoContext);

  return (
    <header className="px-4 py-4 max-w-7xl mx-auto flex items-center justify-between">
      {/* Hide the left image on extra-small screens */}
      <img src={buttons} alt="Buttons" className="hidden sm:block ml-4" />

      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex-grow mx-4"
      >
        <input
          type="text"
          placeholder="Explore"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#454b79] rounded-full placeholder-gray-500 py-2 px-4 pr-12 border border-[#575d92] focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center p-2 rounded-full sm:bg-[#2c2f38]">
          <div className="absolute inset-0 rounded-full sm:bg-gradient-to-r from-[#00b7ff] via-[#f6ffc2] to-[#59adfc] blur-lg"></div>
          <div className="relative z-10 p-2 rounded-full bg-[#454b79]">
            <FaMicrophone />
          </div>
        </button>
      </form>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="text-lg">
          <FaVideo />
        </button>
        <button className="text-lg">
          <FaBell />
        </button>
        <div className="bg-[#007bff] rounded-full w-8 h-8 flex items-center justify-center text-gray-100">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
