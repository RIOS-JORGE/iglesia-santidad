import { useState, useRef, useEffect } from 'react';

export default function MusicBar() {
  const [visible, setVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activated, setActivated] = useState(false);

  // Activar autoplay cuando el usuario interactúa con la página
  useEffect(() => {
    function handleInteraction() {
      if (activated) return;
      setActivated(true);

      // Forzar recarga del iframe con autoplay después de interacción
      if (iframeRef.current) {
        const src = iframeRef.current.src;
        iframeRef.current.src = '';
        // pequeño delay para que el navegador procese
        requestAnimationFrame(() => {
          if (iframeRef.current) {
            iframeRef.current.src = src;
          }
        });
      }
    }

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [activated]);

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
            ref={iframeRef}
            src="https://open.spotify.com/embed/album/494Non4CwsHuPsQu9fHs8K?utm_source=generator&theme=0"
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
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
