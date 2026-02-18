
import React, { useState, useMemo } from 'react';
import { Game, GameCategory } from './types';
import { GAMES } from './data/games';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameViewer from './components/GameViewer';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeCategory, setActiveCategory] = useState<GameCategory>(GameCategory.ALL);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === GameCategory.ALL || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const categories = Object.values(GameCategory);

  return (
    <div className="min-h-screen pb-12">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onHomeClick={() => {
          setSelectedGame(null);
          setActiveCategory(GameCategory.ALL);
          setSearchTerm('');
        }}
      />

      <main className="max-w-7xl mx-auto px-4 mt-8 md:px-8">
        {/* Hero Section */}
        <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-8 md:p-12 text-center md:text-left">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Play Your Favorite <br/>
              <span className="text-indigo-400">Games Anywhere.</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-md mx-auto md:mx-0">
              Access curated collection of high-quality unblocked browser games. 
              No downloads, no blocks, just play.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setActiveCategory(GameCategory.ALL)}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                Browse All
              </button>
              <button 
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                onClick={() => setActiveCategory(GameCategory.PUZZLE)}
              >
                Strategy
              </button>
            </div>
          </div>
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" 
              alt="Gaming Background" 
              className="w-full h-full object-cover opacity-20 mask-gradient"
            />
          </div>
        </section>

        {/* Categories Scroller */}
        <section className="mb-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Game Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <i className="fas fa-fire text-orange-500"></i>
              {activeCategory} Games
            </h3>
            <span className="text-sm text-slate-500">{filteredGames.length} Results</span>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={setSelectedGame} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-search text-slate-600 text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">No games found</h4>
              <p className="text-slate-400">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory(GameCategory.ALL);
                }}
                className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Game Modal / Viewer */}
      {selectedGame && (
        <GameViewer 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 pt-12 text-center text-slate-500 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <i className="fas fa-gamepad text-white text-sm"></i>
              </div>
              <h4 className="text-lg font-bold text-white">NEXUS GAMES</h4>
            </div>
            <p className="text-sm leading-relaxed">
              The premier destination for high-quality, web-based unblocked gaming. Experience the web's best games without restrictions.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-indigo-400">All Games</button></li>
              <li><button className="hover:text-indigo-400">Top Rated</button></li>
              <li><button className="hover:text-indigo-400">Privacy Policy</button></li>
              <li><button className="hover:text-indigo-400">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Community</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-xs pb-8">
          &copy; {new Date().getFullYear()} Nexus Unblocked Games. All games are property of their respective owners.
        </div>
      </footer>
    </div>
  );
};

export default App;
