interface ChapterNavProps {
  chapter: number;
  totalChapters: number;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function ChapterNav({
  chapter,
  totalChapters,
  prevDisabled,
  nextDisabled,
  onPrev,
  onNext,
}: ChapterNavProps) {
  const btnBase =
    'rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:pointer-events-none cursor-pointer disabled:cursor-default';

  return (
    <nav className="flex items-center justify-between gap-4 py-4">
      <button onClick={onPrev} disabled={prevDisabled} className={btnBase}>
        ← Anterior
      </button>

      <span className="text-sm text-text-body">
        Capítulo {chapter} de {totalChapters}
      </span>

      <button onClick={onNext} disabled={nextDisabled} className={btnBase}>
        Siguiente →
      </button>
    </nav>
  );
}
