
import React from 'react';

const Navbar = ({ searchTerm, setSearchTerm, onHomeClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHomeClick}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30">
            <i className="fas fa-gamepad text-xl text-white"></i>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white">
            NEXUS<span className="text-indigo-500">GAMES</span>
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text"
            placeholder="Search unblocked games..."
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button className="hover:text-white transition-colors" onClick={onHomeClick}>Home</button>
          <button className="hover:text-white transition-colors">Trending</button>
          <button className="hover:text-white transition-colors">New</button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <i className="fab fa-github text-lg"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
