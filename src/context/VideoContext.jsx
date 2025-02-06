import { createContext, useState, useEffect } from 'react';

const VideoContext = createContext({});

export const VideoProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce effect: Update debouncedSearchTerm after 500ms of inactivity
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler); // Cleanup previous timeout
  }, [searchTerm]);

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Fetch videos from API based on debouncedSearchTerm or selectedCategory
  useEffect(() => {
    const fetchVideos = async () => {
      const API_KEY = 'AIzaSyBsM9j2Zi9bwlZ8spk1p-of9z6SrW7ivSE';
      const query =
        debouncedSearchTerm.trim() ||
        (selectedCategory === 'All' ? 'educational videos' : selectedCategory);
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          console.error('YouTube API Error:', data.error.message);
          return;
        }

        if (data.items && data.items.length > 0) {
          const videoItems = data.items
            .filter((item) => item.id.videoId)
            .map((item) => ({
              id: item.id.videoId,
              title: item.snippet.title,
              description: `${item.snippet.channelTitle} • ${new Date(
                item.snippet.publishedAt,
              ).toDateString()}`,
              thumbnail: item.snippet.thumbnails.high.url,
            }));
          setVideos(videoItems);
        } else {
          console.warn('No videos found in API response');
          setVideos([]);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [debouncedSearchTerm, selectedCategory]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        handleCategorySelect,
        selectedCategory,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
