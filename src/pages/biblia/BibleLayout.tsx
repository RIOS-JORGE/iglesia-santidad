import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import BookNavDrawer from '../../components/biblia/BookNavDrawer';

const STORAGE_KEY = 'bible-version';

function loadPersistedVersion(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function BibleLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerInitialBook, setDrawerInitialBook] = useState<
    string | undefined
  >();

  const version = loadPersistedVersion();
  const linkBase =
    'px-3 py-1.5 text-sm font-medium rounded transition-colors no-underline';
  const active = 'bg-accent text-white';
  const inactive = 'text-text-body hover:text-primary hover:bg-slate-100';

  function openDrawer(bookName?: string) {
    setDrawerInitialBook(bookName);
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
    setDrawerInitialBook(undefined);
  }

  return (
    <div className="min-h-[calc(100vh-72px-200px)]">
      {/* Bible header */}
      <header className="sticky top-[72px] z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setIsDrawerOpen((p) => !p)}
              className="mr-2 text-xl text-primary transition-colors hover:text-accent cursor-pointer"
              aria-label="Abrir navegación de libros"
            >
              ☰
            </button>
            <Link to="/biblia" className="text-lg font-bold text-primary no-underline">
              Biblia
            </Link>
          </div>

          <nav className="flex items-center gap-2">
            {version && (
              <>
                <NavLink
                  to="/biblia/books"
                  className={({ isActive: ia }) =>
                    `${linkBase} ${ia ? active : inactive}`
                  }
                >
                  Libros
                </NavLink>
                <span className="text-slate-300">|</span>
                <NavLink
                  to="/biblia/search"
                  className={({ isActive: ia }) =>
                    `${linkBase} ${ia ? active : inactive}`
                  }
                >
                  Buscar
                </NavLink>
                <span className="text-slate-300">|</span>
              </>
            )}
            <span className="rounded border border-slate-200 bg-white px-3 py-1.5 text-sm text-text-body">
              Reina Valera 1960
            </span>
          </nav>
        </div>
      </header>

      <BookNavDrawer
        isOpen={isDrawerOpen}
        initialBook={drawerInitialBook}
        onClose={closeDrawer}
      />

      <main className="mx-auto w-full max-w-3xl px-4 py-6">
        <Outlet context={{ openDrawer, closeDrawer }} />
      </main>
    </div>
  );
}
