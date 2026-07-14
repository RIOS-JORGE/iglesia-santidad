import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findBookByQuery, getChapterByBookName, getBooks } from '../../data/biblia/bible';
import type { BibleBook, BibleVerse } from '../../data/biblia/types';
import VerseDisplay from '../../components/biblia/VerseDisplay.tsx';
import ChapterNav from '../../components/biblia/ChapterNav.tsx';

export default function ChapterPage() {
  const { bookName = '', chapterNum = '1' } = useParams<{
    bookName: string;
    chapterNum: string;
  }>();
  const chapter = Number(chapterNum);
  const navigate = useNavigate();

  const [chapterData, setChapterData] = useState<{
    book: BibleBook;
    verses: BibleVerse[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const book = findBookByQuery(decodeURIComponent(bookName));
        if (!book) {
          if (!cancelled) {
            setChapterData(null);
            setLoading(false);
          }
          return;
        }

        const data = await getChapterByBookName(book.name, chapter);
        if (!cancelled) {
          setChapterData(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError('Error al cargar el capítulo');
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [bookName, chapter]);

  const books = useMemo(() => getBooks(), []);

  const nav = useMemo(() => {
    const result = {
      prev: null as { book: string; chapter: number } | null,
      next: null as { book: string; chapter: number } | null,
    };
    if (!chapterData) return result;

    const totalChapters = chapterData.book.chapters;

    if (chapter > 1) {
      result.prev = { book: chapterData.book.name, chapter: chapter - 1 };
    } else {
      const idx = books.findIndex(
        (b: BibleBook) => b.abrev === chapterData.book.abrev,
      );
      if (idx > 0) {
        const prevBook = books[idx - 1];
        result.prev = { book: prevBook.name, chapter: prevBook.chapters };
      }
    }

    if (chapter < totalChapters) {
      result.next = { book: chapterData.book.name, chapter: chapter + 1 };
    } else {
      const idx = books.findIndex(
        (b: BibleBook) => b.abrev === chapterData.book.abrev,
      );
      if (idx >= 0 && idx < books.length - 1) {
        const nextBook = books[idx + 1];
        result.next = { book: nextBook.name, chapter: 1 };
      }
    }

    return result;
  }, [chapterData, books, chapter]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 cursor-pointer"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Empty state
  if (!chapterData) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-text-body">No se encontró el capítulo solicitado.</p>
      </div>
    );
  }

  // Success state
  return (
    <article>
      <h1 className="mb-1 text-xl font-bold text-primary">
        {chapterData.book.name}
      </h1>
      <p className="mb-4 text-sm text-text-body">
        Capítulo {chapter}
      </p>

      <ChapterNav
        chapter={chapter}
        totalChapters={chapterData.book.chapters}
        prevDisabled={!nav.prev}
        nextDisabled={!nav.next}
        onPrev={() => {
          if (nav.prev) {
            navigate(
              `/biblia/${encodeURIComponent(nav.prev.book)}/${nav.prev.chapter}`,
            );
          }
        }}
        onNext={() => {
          if (nav.next) {
            navigate(
              `/biblia/${encodeURIComponent(nav.next.book)}/${nav.next.chapter}`,
            );
          }
        }}
      />

      <div className="py-4">
        {chapterData.verses.map((verse) => (
          <VerseDisplay
            key={verse.verse_number}
            number={verse.verse_number}
            text={verse.text}
          />
        ))}
      </div>

      <ChapterNav
        chapter={chapter}
        totalChapters={chapterData.book.chapters}
        prevDisabled={!nav.prev}
        nextDisabled={!nav.next}
        onPrev={() => {
          if (nav.prev) {
            navigate(
              `/biblia/${encodeURIComponent(nav.prev.book)}/${nav.prev.chapter}`,
            );
          }
        }}
        onNext={() => {
          if (nav.next) {
            navigate(
              `/biblia/${encodeURIComponent(nav.next.book)}/${nav.next.chapter}`,
            );
          }
        }}
      />
    </article>
  );
}
