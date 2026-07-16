import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FacebookIcon from '../icons/FacebookIcon.tsx';
import InstagramIcon from '../icons/InstagramIcon.tsx';
import YoutubeIcon from '../icons/YoutubeIcon.tsx';

const routeLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Biblia', path: '/biblia' },
  { label: 'Galería', path: '/galeria' },
  { label: 'Blog', path: '/blog' },
] as const;

const anchorLinks = [
  { label: 'En Vivo', hash: '#streaming' },
  { label: 'Actividades', hash: '#actividades' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="h-18 bg-white flex items-center px-4 md:px-8 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-[20px] font-bold text-primary no-underline">
          ✝ Santidad a Jehovah
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
                  isActive ? 'text-accent' : 'text-text-nav'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {anchorLinks.map((link) => (
            <a
              key={link.label}
              href={link.hash}
              className="text-[15px] font-medium text-text-nav no-underline transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://www.facebook.com/santidadajehovah" target="_blank" rel="noopener noreferrer">
            <FacebookIcon size={22} />
          </a>
          <a href="https://www.instagram.com/santidadajehovah" target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={22} />
          </a>
          <a href="https://www.youtube.com/@santidadajehovah0" target="_blank" rel="noopener noreferrer">
            <YoutubeIcon size={22} />
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 bg-transparent border-none cursor-pointer p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span className="block w-6 h-0.5 bg-primary rounded" />
          <span className="block w-6 h-0.5 bg-primary rounded" />
          <span className="block w-6 h-0.5 bg-primary rounded" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-18 left-0 w-full bg-white flex flex-col items-center gap-4 py-6 shadow-lg md:hidden">
          {routeLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-[15px] font-medium no-underline transition-colors ${
                  isActive ? 'text-accent' : 'text-text-nav'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {anchorLinks.map((link) => (
            <a
              key={link.label}
              href={link.hash}
              onClick={() => setOpen(false)}
              className="text-[15px] font-medium text-text-nav no-underline transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.facebook.com/santidadajehovah" target="_blank" rel="noopener noreferrer">
              <FacebookIcon size={22} />
            </a>
            <a href="https://www.instagram.com/santidadajehovah" target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={22} />
            </a>
            <a href="https://www.youtube.com/@santidadajehovah0" target="_blank" rel="noopener noreferrer">
              <YoutubeIcon size={22} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
