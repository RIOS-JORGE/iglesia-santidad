import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FacebookIcon from '../icons/FacebookIcon.tsx';
import InstagramIcon from '../icons/InstagramIcon.tsx';
import YoutubeIcon from '../icons/YoutubeIcon.tsx';

const routeLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Biblia', path: '/biblia' },
  { label: 'Blog', path: '/blog' },
] as const;


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  function toggleDark() {
    setDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  return (
    <nav className="h-18 bg-white dark:bg-slate-900 flex items-center px-4 md:px-8 sticky top-0 z-50 shadow-sm dark:shadow-black/20">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-[20px] font-bold text-primary dark:text-white no-underline">
          Santidad a Jehovah
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {routeLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`text-[15px] font-medium no-underline transition-colors ${
                  isActive ? 'text-accent' : 'text-text-nav dark:text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop toggle + social icons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="bg-transparent border-none cursor-pointer p-1 transition-colors"
            aria-label="Alternar modo oscuro"
          >
            {dark ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-nav dark:text-slate-300">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <a href="https://www.facebook.com/santidadajehovah" target="_blank" rel="noopener noreferrer" className="text-text-nav dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors">
            <FacebookIcon size={22} />
          </a>
          <a href="https://www.instagram.com/santidadajehovah" target="_blank" rel="noopener noreferrer" className="text-text-nav dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors">
            <InstagramIcon size={22} />
          </a>
          <a href="https://www.youtube.com/@santidadajehovah0" target="_blank" rel="noopener noreferrer" className="text-text-nav dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors">
            <YoutubeIcon size={22} />
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 bg-transparent border-none cursor-pointer p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span className="block w-6 h-0.5 bg-primary dark:bg-white rounded" />
          <span className="block w-6 h-0.5 bg-primary dark:bg-white rounded" />
          <span className="block w-6 h-0.5 bg-primary dark:bg-white rounded" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-18 left-0 w-full bg-white dark:bg-slate-900 flex flex-col items-center gap-4 py-6 shadow-lg dark:shadow-black/20 md:hidden">
          {routeLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-[15px] font-medium no-underline transition-colors ${
                  isActive ? 'text-accent' : 'text-text-nav dark:text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={toggleDark}
              className="bg-transparent border-none cursor-pointer p-1 transition-colors"
              aria-label="Alternar modo oscuro"
            >
              {dark ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-nav dark:text-slate-300">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <a href="https://www.facebook.com/santidadajehovah" target="_blank" rel="noopener noreferrer" className="text-text-nav dark:text-slate-300">
              <FacebookIcon size={22} />
            </a>
            <a href="https://www.instagram.com/santidadajehovah" target="_blank" rel="noopener noreferrer" className="text-text-nav dark:text-slate-300">
              <InstagramIcon size={22} />
            </a>
            <a href="https://www.youtube.com/@santidadajehovah0" target="_blank" rel="noopener noreferrer" className="text-text-nav dark:text-slate-300">
              <YoutubeIcon size={22} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
