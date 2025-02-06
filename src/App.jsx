import { Routes, Route } from 'react-router-dom';
import { Header, Sidebar, Home, Missing } from './components';
import { VideoProvider } from './context/VideoContext';

const App = () => {
  return (
    <>
      <VideoProvider>
        <Header />

        <div className="flex">
          <Sidebar />

          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Missing />} />
            </Routes>
          </div>
        </div>
      </VideoProvider>
    </>
  );
};

export default App;
