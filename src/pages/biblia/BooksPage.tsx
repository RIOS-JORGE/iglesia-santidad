import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { BibleBook } from '../../data/biblia/types';
import { getBooks } from '../../data/biblia/bible';
import BookCard from '../../components/biblia/BookCard.tsx';

interface BibleContext {
  openDrawer: (book?: string) => void;
}

export default function BooksPage() {
  const { openDrawer } = useOutletContext<BibleContext>();

  const grouped = useMemo(() => {
    const books = getBooks();
    return {
      OT: books.filter((b: BibleBook) => b.testament === 'AT'),
      NT: books.filter((b: BibleBook) => b.testament === 'NT'),
    };
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary">Libros de la Biblia</h1>

      {grouped.OT.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-accent">
            Antiguo Testamento
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.OT.map((book) => (
              <BookCard
                key={book.abrev}
                book={book}
                onSelect={() => openDrawer(book.name)}
              />
            ))}
          </div>
        </section>
      )}

      {grouped.NT.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-accent">
            Nuevo Testamento
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.NT.map((book) => (
              <BookCard
                key={book.abrev}
                book={book}
                onSelect={() => openDrawer(book.name)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
