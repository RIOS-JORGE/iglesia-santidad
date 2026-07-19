import { useState } from 'react';

export default function MusicBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-t border-primary/20">
      <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-accent text-sm font-semibold shrink-0 hidden sm:inline">
            🎵 Alabanza
          </span>
          <span className="text-text-light text-xs truncate">
            Himnos Antiguos — Versión Gospel
          </span>
        </div>

        <div className="flex-1 max-w-md">
          <iframe
            src="https://open.spotify.com/embed/album/494Non4CwsHuPsQu9fHs8K?utm_source=generator&theme=0"
            width="100%"
            height="80"
            frameBorder="0"
            allow="fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          />
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-text-light hover:text-white transition-colors shrink-0 p-1"
          aria-label="Cerrar reproductor"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
