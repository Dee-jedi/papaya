import { useContext } from 'react';
import VideoContext from '../context/VideoContext';

const Categories = () => {
  const categories = [
    { item: 'All' },
    { item: 'Gaming' },
    { item: 'Thoughts' },
    { item: 'Music' },
    { item: 'Thrillers' },
    { item: 'Mixes' },
    { item: 'Avatar' },
    { item: 'Film Criticism' },
    { item: 'Korean Dramas' },
    { item: 'Characters' },
  ];

  const { selectedCategory, handleCategorySelect } = useContext(VideoContext);

  return (
    <div className="flex flex-nowrap space-x-2 sm:space-x-4 overflow-x-auto p-6 sm:mx-auto w-full items-center sm:justify-center scrollbar-hide bg-gradient-to-r to-[#1e1e36] from-[#2b2f53]">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategorySelect(category.item)}
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded transition-colors duration-200 ${
            selectedCategory === category.item
              ? 'text-gray-300 bg-gradient-to-r from-purple-900 via-transparent to-purple-900 bg-opacity-20'
              : 'text-gray-400 hover:text-purple-300'
          }`}
          style={{
            background:
              selectedCategory === category.item
                ? 'radial-gradient(circle at center, rgba(128, 90, 213, 0.3), transparent)'
                : 'transparent',
          }}
        >
          {category.item}
        </button>
      ))}
    </div>
  );
};

export default Categories;
