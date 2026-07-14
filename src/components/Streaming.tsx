import { useEffect, useRef, useState } from 'react';

type LiveStatus = 'loading' | 'live' | 'offline';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function Streaming() {
  const [status, setStatus] = useState<LiveStatus>('loading');
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let destroyed = false;

    function createPlayer() {
      if (!window.YT || !containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '100%',
        width: '100%',
        videoId: 'live_stream',
        playerVars: {
          channel: 'UCMbh0FCJ4JHtwMap7hi0FrK',
          autoplay: 1,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            if (destroyed) return;
            const state = playerRef.current?.getPlayerState();
            if (
              state === window.YT.PlayerState.PLAYING ||
              state === window.YT.PlayerState.BUFFERING
            ) {
              setStatus('live');
            }
          },
          onStateChange: (e: { data: number }) => {
            if (destroyed) return;
            if (e.data === window.YT.PlayerState.PLAYING) {
              setStatus('live');
            }
          },
          onError: () => {
            if (destroyed) return;
            setStatus('offline');
          },
        },
      });
    }

    function onAPIReady() {
      if (!destroyed) createPlayer();
    }

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = onAPIReady;
    } else {
      createPlayer();
    }

    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <section id="streaming" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-[32px] font-bold text-primary">Transmisión en Vivo</h2>
        <p className="text-text-body mt-2 text-base">
          Domingos 10:00 AM | Miércoles 7:00 PM
        </p>

        <div className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl shadow-lg aspect-video">
          {status === 'live' ? (
            <div ref={containerRef} className="h-full w-full" />
          ) : (
            <>
              <img
                src="/Paraos-por-los-caminos.jpg"
                alt="Santidad a Jehovah"
                className="h-full w-full object-fill"
              />
            </>
          )}
        </div>

        <p className="text-text-light mt-4 text-sm">
          Síguenos también en YouTube para no perderte ninguna transmisión.
        </p>
      </div>
    </section>
  );
}
