import { createContext, useState, useEffect } from 'react';

const VideoContext = createContext({});

export const VideoProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Increase debounce time to 2 seconds to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // Increased from 500ms to 2000ms

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    // Fetch videos from API based on debouncedSearchTerm or selectedCategory
    const fetchVideos = async () => {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      const query =
        debouncedSearchTerm.trim() ||
        (selectedCategory === 'All' ? 'educational videos' : selectedCategory);

      // Check local storage first
      const cacheKey = `videos_${query}`;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setVideos(JSON.parse(cachedData));
        return; // Prevent unnecessary API calls
      }

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
          localStorage.setItem(cacheKey, JSON.stringify(videoItems)); // Store in cache
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
