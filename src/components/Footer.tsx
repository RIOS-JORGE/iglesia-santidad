import { Link } from 'react-router-dom';
import FacebookIcon from '../icons/FacebookIcon.tsx';
import InstagramIcon from '../icons/InstagramIcon.tsx';
import YoutubeIcon from '../icons/YoutubeIcon.tsx';

export default function Footer() {
  return (
    <footer className="bg-primary text-white px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding */}
        <div>
          <p className="text-[20px] font-bold mb-3">Santidad a Jehovah</p>
          <p className="text-sm text-white/70 leading-relaxed">
            Unidos en la fe, creciendo en el amor de Cristo.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-semibold text-base mb-3">Navegación</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-white transition-colors no-underline text-white/70">Inicio</Link></li>
            <li><Link to="/biblia" className="hover:text-white transition-colors no-underline text-white/70">Biblia</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors no-underline text-white/70">Blog</Link></li>
          </ul>
        </div>

        {/* Social + Copyright */}
        <div>
          <p className="font-semibold text-base mb-3">Redes Sociales</p>
          <div className="flex items-center gap-4 mb-6">
            <a href="https://www.facebook.com/santidadajehovah" target="_blank" rel="noopener noreferrer">
              <FacebookIcon size={22} color="#FFFFFF" />
            </a>
            <a href="https://www.instagram.com/santidadajehovah" target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={22} color="#FFFFFF" />
            </a>
            <a href="https://www.youtube.com/@santidadajehovah0" target="_blank" rel="noopener noreferrer">
              <YoutubeIcon size={22} color="#FFFFFF" />
            </a>
          </div>
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Santidad a Jehovah. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
