import { Link } from 'react-router-dom';
import BookOpenIcon from '../icons/BookOpenIcon.tsx';

export default function BibleSection() {
  return (
    <section className="bg-white dark:bg-slate-900 px-4 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[32px] font-bold text-primary dark:text-white">La Biblia</h2>
        <p className="text-text-body dark:text-slate-300 text-base mt-3 max-w-2xl mx-auto">
          La Palabra de Dios es viva y eficaz. Descubre el mensaje de amor, esperanza y salvación
          que Dios tiene para ti a través de las Escrituras.
        </p>
        <Link
          to="/biblia"
          className="mt-6 inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full text-sm no-underline hover:opacity-90 transition-opacity"
        >
          <BookOpenIcon size={18} />
          Leer la Biblia
        </Link>
      </div>
    </section>
  );
}
