import React, { useState } from 'react';

const GameViewer = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      try {
        if (!isFullscreen) {
          if (iframe.requestFullscreen) iframe.requestFullscreen();
          else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
      } catch (e) {
        console.warn("Fullscreen request failed", e);
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const isHtmlSnippet = game.url.trim().startsWith('<');

  return React.createElement('div', { className: "fixed inset-0 z-[60] bg-black flex flex-col" },
    React.createElement('div', { className: "bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between" },
      React.createElement('div', { className: "flex items-center gap-4" },
        React.createElement('button', {
          onClick: onClose,
          className: "w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
        },
          React.createElement('i', { className: "fas fa-arrow-left" })
        ),
        React.createElement('div', null,
          React.createElement('h2', { className: "text-lg font-bold text-white leading-none" }, game.title),
          React.createElement('span', { className: "text-xs text-slate-500 uppercase tracking-widest" }, game.category)
        )
      ),
      React.createElement('div', { className: "flex items-center gap-2" },
        React.createElement('button', {
          onClick: toggleFullscreen,
          className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2"
        },
          React.createElement('i', { className: `fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}` }),
          React.createElement('span', { className: "hidden sm:inline" }, isFullscreen ? 'Exit Fullscreen' : 'Fullscreen')
        ),
        React.createElement('button', {
          onClick: onClose,
          className: "px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors"
        }, "Close Game")
      )
    ),
    React.createElement('div', { className: "flex-1 bg-[#111] relative flex items-center justify-center overflow-hidden" },
      React.createElement('iframe', {
        id: "game-iframe",
        src: isHtmlSnippet ? undefined : game.url,
        srcDoc: isHtmlSnippet ? `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body, html { 
                  margin: 0; 
                  padding: 0; 
                  width: 100%; 
                  height: 100%; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  background: #111; 
                  color: white; 
                  overflow: hidden;
                  font-family: sans-serif;
                }
                .c3htmlwrap {
                  /* Ensure the provided snippet centers correctly if it has fixed dimensions */
                  margin: auto !important;
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
              </style>
            </head>
            <body>
              ${game.url}
            </body>
          </html>
        ` : undefined,
        className: "w-full h-full border-none shadow-2xl",
        allowFullScreen: true,
        allow: "autoplay; fullscreen; keyboard",
        title: game.title,
        sandbox: "allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation"
      })
    ),
    React.createElement('div', { className: "hidden md:block bg-slate-900 p-3 text-center text-xs text-slate-500" },
      "Running: Basketball Hoops Custom Nexus Embed"
    )
  );
};

export default GameViewer;