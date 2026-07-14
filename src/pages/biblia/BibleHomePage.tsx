import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import BookOpenIcon from '../../icons/BookOpenIcon.tsx';

interface BibleContext {
  openDrawer: (book?: string) => void;
}

const STORAGE_KEY = 'bible-version';

export default function BibleHomePage() {
  const navigate = useNavigate();
  const { openDrawer } = useOutletContext<BibleContext>();

  const hasVersion = (() => {
    try {
      return !!localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  })();

  useEffect(() => {
    if (hasVersion) {
      navigate('/biblia/books', { replace: true });
    }
  }, [hasVersion, navigate]);

  if (hasVersion) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-text-body">Cargando...</div>
      </div>
    );
  }

  function handleSelectVersion() {
    try {
      localStorage.setItem(STORAGE_KEY, 'rv1960');
    } catch {
      // localStorage not available
    }
    navigate('/biblia/books');
  }

  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <div className="mb-6 flex justify-center">
        <BookOpenIcon size={48} color="#1E3A5F" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-primary">La Biblia</h1>
      <p className="mb-8 text-text-body">
        Seleccioná una versión para comenzar a leer
      </p>

      <button
        onClick={handleSelectVersion}
        className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-6 py-4 text-left transition-colors hover:border-accent hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span className="font-medium text-primary">Reina Valera 1960</span>
        <span className="ml-2 text-xs text-text-body">(RVR1960)</span>
      </button>

      <button
        onClick={() => openDrawer()}
        className="mt-4 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-6 py-4 text-left text-text-body transition-colors hover:border-accent hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span className="font-medium text-primary">Explorar libros</span>
        <span className="ml-2 text-xs text-text-body">→</span>
      </button>
    </div>
  );
}
