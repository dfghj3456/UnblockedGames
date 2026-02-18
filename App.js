
import React, { useState, useMemo, useEffect } from 'react';
import { GameCategory } from './types.js';
import Navbar from './components/Navbar.js';
import GameCard from './components/GameCard.js';
import GameViewer from './components/GameViewer.js';

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState(GameCategory.ALL);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch games from the JSON file
    fetch('./data/games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load games:", err);
        setLoading(false);
      });
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === GameCategory.ALL || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchTerm, activeCategory]);

  const categories = Object.values(GameCategory);

  if (loading) {
    return React.createElement('div', { className: "min-h-screen bg-slate-950 flex items-center justify-center" },
      React.createElement('div', { className: "text-indigo-500 animate-pulse font-black text-2xl tracking-widest" }, "LOADING NEXUS...")
    );
  }

  return React.createElement('div', { className: "min-h-screen pb-12" },
    React.createElement(Navbar, {
      searchTerm,
      setSearchTerm,
      onHomeClick: () => {
        setSelectedGame(null);
        setActiveCategory(GameCategory.ALL);
        setSearchTerm('');
      }
    }),
    React.createElement('main', { className: "max-w-7xl mx-auto px-4 mt-8 md:px-8" },
      React.createElement('section', { className: "mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-8 md:p-12 text-center md:text-left" },
        React.createElement('div', { className: "relative z-10 max-w-2xl" },
          React.createElement('h2', { className: "text-4xl md:text-5xl font-black text-white mb-4 leading-tight" },
            "Play Your Favorite ", React.createElement('br'),
            React.createElement('span', { className: "text-indigo-400" }, "Games Anywhere.")
          ),
          React.createElement('p', { className: "text-lg text-slate-300 mb-8 max-w-md mx-auto md:mx-0" },
            "Access curated collection of high-quality unblocked browser games. No downloads, no blocks, just play."
          ),
          React.createElement('div', { className: "flex flex-wrap gap-4 justify-center md:justify-start" },
            React.createElement('button', {
              onClick: () => setActiveCategory(GameCategory.ALL),
              className: "px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            }, "Browse All"),
            React.createElement('button', {
              className: "px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all",
              onClick: () => setActiveCategory(GameCategory.PUZZLE)
            }, "Strategy")
          )
        ),
        React.createElement('div', { className: "absolute top-0 right-0 w-1/2 h-full hidden lg:block" },
          React.createElement('div', { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" }),
          React.createElement('img', {
            src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            alt: "Gaming Background",
            className: "w-full h-full object-cover opacity-20 mask-gradient"
          })
        )
      ),
      React.createElement('section', { className: "mb-8" },
        React.createElement('div', { className: "flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide" },
          categories.map((cat) =>
            React.createElement('button', {
              key: cat,
              onClick: () => setActiveCategory(cat),
              className: `whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`
            }, cat)
          )
        )
      ),
      React.createElement('section', null,
        React.createElement('div', { className: "flex items-center justify-between mb-6" },
          React.createElement('h3', { className: "text-xl font-bold text-white flex items-center gap-2" },
            React.createElement('i', { className: "fas fa-fire text-orange-500" }),
            `${activeCategory} Games`
          ),
          React.createElement('span', { className: "text-sm text-slate-500" }, `${filteredGames.length} Results`)
        ),
        filteredGames.length > 0
          ? React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" },
              filteredGames.map((game) =>
                React.createElement(GameCard, {
                  key: game.id,
                  game: game,
                  onClick: setSelectedGame
                })
              )
            )
          : React.createElement('div', { className: "flex flex-col items-center justify-center py-24 text-center" },
              React.createElement('div', { className: "w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4" },
                React.createElement('i', { className: "fas fa-search text-slate-600 text-3xl" })
              ),
              React.createElement('h4', { className: "text-xl font-bold text-white mb-2" }, "No games found"),
              React.createElement('p', { className: "text-slate-400" }, "Try adjusting your search or category filters."),
              React.createElement('button', {
                onClick: () => {
                  setSearchTerm('');
                  setActiveCategory(GameCategory.ALL);
                },
                className: "mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
              }, "Clear all filters")
            )
      )
    ),
    selectedGame && React.createElement(GameViewer, {
      game: selectedGame,
      onClose: () => setSelectedGame(null)
    }),
    React.createElement('footer', { className: "mt-20 border-t border-slate-800 pt-12 text-center text-slate-500 max-w-7xl mx-auto px-4" },
      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left" },
        React.createElement('div', null,
          React.createElement('div', { className: "flex items-center gap-2 mb-4" },
            React.createElement('div', { className: "w-8 h-8 bg-indigo-600 rounded flex items-center justify-center" },
              React.createElement('i', { className: "fas fa-gamepad text-white text-sm" })
            ),
            React.createElement('h4', { className: "text-lg font-bold text-white" }, "NEXUS GAMES")
          ),
          React.createElement('p', { className: "text-sm leading-relaxed" },
            "The premier destination for high-quality, web-based unblocked gaming. Experience the web's best games without restrictions."
          )
        ),
        React.createElement('div', null,
          React.createElement('h4', { className: "text-white font-bold mb-4 uppercase text-xs tracking-widest" }, "Navigation"),
          React.createElement('ul', { className: "space-y-2 text-sm" },
            ['All Games', 'Top Rated', 'Privacy Policy', 'Terms of Service'].map(item =>
              React.createElement('li', { key: item }, React.createElement('button', { className: "hover:text-indigo-400" }, item))
            )
          )
        ),
        React.createElement('div', null,
          React.createElement('h4', { className: "text-white font-bold mb-4 uppercase text-xs tracking-widest" }, "Community"),
          React.createElement('div', { className: "flex gap-4" },
            ['discord', 'twitter', 'youtube'].map(icon =>
              React.createElement('a', { key: icon, href: "#", className: "w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all" },
                React.createElement('i', { className: `fab fa-${icon}` })
              )
            )
          )
        )
      ),
      React.createElement('div', { className: "text-xs pb-8" },
        `© ${new Date().getFullYear()} Nexus Unblocked Games. All games are property of their respective owners.`
      )
    )
  );
};

export default App;
