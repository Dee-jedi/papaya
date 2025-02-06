import { useContext, useState } from 'react';
import VideoContext from '../context/VideoContext';

const Videos = () => {
  const { videos } = useContext(VideoContext);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  // Function to play video when clicked
  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  // Function to close the player
  const handleClosePlayer = () => {
    setSelectedVideoId(null);
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: 'linear-gradient(135deg, #2b2f53, #1d1c34)',
      }}
    >
      {/* Embedded YouTube player with responsive aspect ratio and close button */}
      {selectedVideoId && (
        <div className="mb-6 flex justify-center relative">
          <div className="relative w-full max-w-lg mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            {/* Close Button */}
            <button
              onClick={handleClosePlayer}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Video Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="relative bg-gradient-to-r from-[#1e1e36] to-[#2b2f53] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                  {video.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No videos found
          </p>
        )}
      </div>
    </div>
  );
};

export default Videos;
