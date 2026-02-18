
import React, { useState } from 'react';

const GameViewer = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (!isFullscreen) {
        if (iframe.requestFullscreen) iframe.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-lg font-bold text-white leading-none">{game.title}</h2>
            <span className="text-xs text-slate-500 uppercase tracking-widest">{game.category}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2"
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors"
          >
            Close Game
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#111] relative">
        <iframe 
          id="game-iframe"
          src={game.url}
          className="w-full h-full border-none shadow-2xl"
          allowFullScreen
          allow="autoplay; fullscreen; keyboard"
          title={game.title}
        ></iframe>
      </div>
      
      <div className="hidden md:block bg-slate-900 p-3 text-center text-xs text-slate-500">
        Controls may vary by game. Press <strong>Esc</strong> to exit full-screen if the button is unavailable.
      </div>
    </div>
  );
};

export default GameViewer;
