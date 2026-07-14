import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchBible } from '../../data/biblia/bible';
import type { SearchResult } from '../../data/biblia/bible';

const TESTAMENT_OPTIONS = [
  { value: 'both', label: 'Ambos' },
  { value: 'AT', label: 'Antiguo Testamento' },
  { value: 'NT', label: 'Nuevo Testamento' },
] as const;

const PAGE_SIZE = 20;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [testament, setTestament] = useState<string>('both');
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const isFirstRender = useRef(true);

  // Debounce input
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Async search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setAllResults([]);
      return;
    }

    let cancelled = false;

    async function doSearch() {
      setSearchLoading(true);
      setSearchError(null);

      try {
        const testamentFilter =
          testament === 'both' ? undefined : (testament as 'AT' | 'NT');
        const results = await searchBible(debouncedQuery, testamentFilter);
        if (!cancelled) {
          setAllResults(results);
          setSearchLoading(false);
        }
      } catch {
        if (!cancelled) {
          setSearchError('Error al realizar la búsqueda');
          setSearchLoading(false);
        }
      }
    }

    doSearch();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, testament]);

  const totalResults = allResults.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageResults = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return allResults.slice(start, start + PAGE_SIZE);
  }, [allResults, currentPage]);

  const handleTestamentChange = useCallback((t: string) => {
    setTestament(t);
    setPage(1);
  }, []);

  const hasSearched = debouncedQuery.trim().length > 0;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary">
        Buscar en la Escritura
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar en la Escritura..."
          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-primary placeholder-text-body focus:outline-none focus:ring-2 focus:ring-accent"
          autoFocus
        />
        <select
          value={testament}
          onChange={(e) => handleTestamentChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {TESTAMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        {!hasSearched && (
          <p className="text-center text-text-body py-8">
            Escribí un término para comenzar la búsqueda
          </p>
        )}

        {searchLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          </div>
        )}

        {searchError && (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <p className="text-red-500">{searchError}</p>
            <button
              onClick={() => {
                setDebouncedQuery((prev) => prev);
                setSearchError(null);
                setSearchLoading(true);
                const f = async () => {
                  try {
                    const testamentFilter =
                      testament === 'both' ? undefined : (testament as 'AT' | 'NT');
                    const results = await searchBible(debouncedQuery, testamentFilter);
                    setAllResults(results);
                  } catch {
                    setSearchError('Error al realizar la búsqueda');
                  }
                  setSearchLoading(false);
                };
                f();
              }}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        )}

        {!searchLoading && !searchError && hasSearched && totalResults === 0 && (
          <p className="text-center text-text-body py-8">
            Sin resultados para &quot;{debouncedQuery}&quot;
          </p>
        )}

        {!searchLoading && !searchError && hasSearched && totalResults > 0 && (
          <>
            <p className="mb-2 text-sm text-text-body">
              {totalResults} resultado{totalResults !== 1 ? 's' : ''} para &quot;{debouncedQuery}&quot;
            </p>
            <ul className="divide-y divide-slate-200">
              {pageResults.map((result, idx) => (
                <li key={`${result.reference}-${result.verse_number}-${idx}`}>
                  <Link
                    to={`/biblia/${encodeURIComponent(result.book.name)}/${result.chapter}`}
                    className="block px-1 py-3 transition-colors hover:bg-slate-50 no-underline"
                  >
                    <span className="text-xs font-medium text-accent">
                      {result.reference}
                    </span>
                    <p className="mt-1 font-serif leading-relaxed text-primary/90">
                      {result.text}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 py-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:pointer-events-none cursor-pointer disabled:cursor-default"
                >
                  ← Anterior
                </button>
                <span className="text-sm text-text-body">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage >= totalPages}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:pointer-events-none cursor-pointer disabled:cursor-default"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
