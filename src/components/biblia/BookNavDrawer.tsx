import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BibleBook } from '../../data/biblia/types';
import { getBooksByTestament } from '../../data/biblia/bible';

interface BookNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialBook?: string;
}

export default function BookNavDrawer({
  isOpen,
  onClose,
  initialBook,
}: BookNavDrawerProps) {
  const navigate = useNavigate();
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const otBooks = useMemo(() => getBooksByTestament('AT'), []);
  const ntBooks = useMemo(() => getBooksByTestament('NT'), []);

  useEffect(() => {
    if (initialBook && isOpen) {
      setExpandedBook(initialBook);
    }
  }, [initialBook, isOpen]);

  function handleBookClick(bookName: string) {
    setExpandedBook((prev) => (prev === bookName ? null : bookName));
  }

  function handleChapterClick(bookName: string, chapterNum: number) {
    navigate(`/biblia/${encodeURIComponent(bookName)}/${chapterNum}`);
    onClose();
  }

  function renderSection(title: string, sectionBooks: BibleBook[]) {
    if (sectionBooks.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="sticky top-0 z-10 bg-white py-2 text-xs font-bold tracking-widest uppercase text-accent">
          {title}
        </h3>
        <ul>
          {sectionBooks.map((book) => {
            const isExpanded = expandedBook === book.name;
            return (
              <li key={book.abrev}>
                <button
                  onClick={() => handleBookClick(book.name)}
                  className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm text-primary transition-colors hover:bg-slate-100 cursor-pointer"
                >
                  <span>{book.name}</span>
                  <span
                    className={`text-xs text-text-body transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <div className="mb-2 mt-1 grid grid-cols-6 gap-1 px-2">
                    {Array.from(
                      { length: book.chapters },
                      (_, i) => i + 1,
                    ).map((ch) => (
                      <button
                        key={ch}
                        onClick={() => handleChapterClick(book.name, ch)}
                        className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-xs text-text-body transition-colors hover:border-accent hover:text-accent cursor-pointer"
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-base font-semibold text-primary">Libros</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-text-body transition-colors hover:text-primary cursor-pointer"
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className="overflow-y-auto px-4 pb-6 pt-4"
          style={{ height: 'calc(100% - 56px)' }}
        >
          {renderSection('ANTIGUO TESTAMENTO', otBooks)}
          {renderSection('NUEVO TESTAMENTO', ntBooks)}
        </div>
      </div>
    </>
  );
}
