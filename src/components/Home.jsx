import Videos from './Videos';
import Categories from './Categories';

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="flex flex-col h-screen">
        {/* Categories Component */}
        <Categories />

        {/* Videos Component with vertical scrolling */}
        <div className="flex-grow overflow-y-auto">
          <Videos />
        </div>
      </div>
    </main>
  );
};

export default Home;
