import type { BibleBook } from '../../data/biblia/types';

interface BookCardProps {
  book: BibleBook;
  onSelect: () => void;
}

export default function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:border-accent hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 cursor-pointer dark:border-slate-700 dark:bg-slate-800"
    >
      <span className="font-medium text-primary dark:text-white">{book.name}</span>
      <span className="ml-2 text-xs text-text-body dark:text-slate-300">
        {book.chapters} capítulos
      </span>
    </button>
  );
}
