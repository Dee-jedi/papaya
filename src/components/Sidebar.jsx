import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVideo, FaMusic, FaClock, FaDownload } from 'react-icons/fa';
import { MdSubscriptions, MdLibraryBooks } from 'react-icons/md';
import { AiOutlineHistory } from 'react-icons/ai';

const menuItems = [
  { id: 1, title: 'Home', link: '/', icon: <FaHome /> },
  { id: 2, title: 'Shorts', link: '/shorts', icon: <FaVideo /> },
  {
    id: 3,
    title: 'Subscriptions',
    link: '/subscriptions',
    icon: <MdSubscriptions />,
  },
  { id: 4, title: 'Papaya Music', link: '/papayamusic', icon: <FaMusic /> },
  { id: 5, title: 'Library', link: '/library', icon: <MdLibraryBooks /> },
  { id: 6, title: 'History', link: '/history', icon: <AiOutlineHistory /> },
  { id: 7, title: 'Watch Later', link: '/watch', icon: <FaClock /> },
  { id: 8, title: 'Downloads', link: '/downloads', icon: <FaDownload /> },
];

const Sidebar = () => {
  return (
    <div
      style={{
        width: '240px',
        height: 'calc(100vh - 60px)',
        background: 'linear-gradient(135deg, #2e335a 0%, #1c1b33 100%)',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
      }}
      className="p-3 text-gray-300 lg:flex flex-col hidden"
    >
      {/* Papaya Header */}
      <div className="flex items-center gap-2 px-3 py-4 mb-2  text-purple-200 text-xl font-bold border-b border-gray-600/20">
        Papaya
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3a3b5a] border-b border-gray-600/20"
          >
            <span className="text-lg">{item.icon}</span>
            <Link to={item.link} className="text-sm">
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
