import { useEffect, useState } from 'react';

type LiveStatus = 'checking' | 'live' | 'offline';

type LiveResponse = {
  live?: boolean;
  videoId?: string | null;
  title?: string | null;
};

const POLL_INTERVAL_MS = 60_000;
const VIDEO_ID_PATTERN = /^[\w-]{11}$/;

export default function Streaming() {
  const [status, setStatus] = useState<LiveStatus>('checking');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function checkLiveStatus() {
      try {
        const response = await fetch('/api/live', {
          signal: controller.signal,
          headers: { accept: 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }

        const data = (await response.json()) as LiveResponse;
        if (cancelled) return;

        if (data.live && typeof data.videoId === 'string' && VIDEO_ID_PATTERN.test(data.videoId)) {
          setVideoId(data.videoId);
          setTitle(data.title ?? null);
          setStatus('live');
        } else {
          setVideoId(null);
          setTitle(null);
          setStatus('offline');
        }
      } catch {
        if (cancelled) return;
        setVideoId(null);
        setTitle(null);
        setStatus('offline');
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        void checkLiveStatus();
      }
    }

    void checkLiveStatus();
    const intervalId = window.setInterval(checkLiveStatus, POLL_INTERVAL_MS);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section id="streaming" className="bg-white dark:bg-slate-900 px-4 py-16">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-[32px] font-bold text-primary dark:text-white">Transmisión en Vivo</h2>
        <p className="text-text-body dark:text-slate-300 mt-2 text-base">
          Martes 20:30hs
        </p>

        <div className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl shadow-lg dark:shadow-black/20 aspect-video">
          {status === 'live' && videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title ?? 'Transmisión en vivo'}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <img
              src="/Paraos-por-los-caminos.jpg"
              alt="Santidad a Jehovah"
              className="h-full w-full object-fill"
            />
          )}
        </div>

        <p className="text-text-light dark:text-slate-400 mt-4 text-sm">
          Síguenos también en YouTube para no perderte ninguna transmisión.
        </p>
      </div>
    </section>
  );
}
