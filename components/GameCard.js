
import React from 'react';

const GameCard = ({ game, onClick }) => {
  return React.createElement('div', {
    className: "group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20",
    onClick: () => onClick(game)
  },
    React.createElement('div', { className: "aspect-video overflow-hidden" },
      React.createElement('img', {
        src: game.thumbnail,
        alt: game.title,
        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
        loading: "lazy"
      })
    ),
    React.createElement('div', { className: "p-4" },
      React.createElement('div', { className: "flex justify-between items-start mb-2" },
        React.createElement('h3', { className: "font-bold text-lg text-white group-hover:text-indigo-400 transition-colors" }, game.title),
        React.createElement('span', { className: "px-2 py-0.5 text-xs font-medium bg-slate-700 text-slate-300 rounded-full" }, game.category)
      ),
      React.createElement('p', { className: "text-sm text-slate-400 line-clamp-2" }, game.description)
    ),
    React.createElement('div', { className: "absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" })
  );
};

export default GameCard;
