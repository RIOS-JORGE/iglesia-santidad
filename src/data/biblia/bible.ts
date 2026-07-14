import type { BibleBook, BibleVerse } from './types';
import booksData from './books.json';

const books = booksData as BibleBook[];

// Lookup maps (solo para books — verses se construyen después)
const bookByAbrev = new Map<string, BibleBook>();
const bookByName = new Map<string, BibleBook>();
for (const book of books) {
  bookByAbrev.set(book.abrev, book);
  bookByName.set(book.name.toLowerCase(), book);
}

// Estado lazy para verses
let versesLoaded = false;
let verses: BibleVerse[] = [];
let versesByBookChapter = new Map<string, BibleVerse[]>();

async function ensureVersesLoaded() {
  if (versesLoaded) return;
  const data = await import('./verses.json');
  verses = data.default as BibleVerse[];
  for (const v of verses) {
    const key = `${v.book_abrev}|${v.chapter}`;
    if (!versesByBookChapter.has(key)) {
      versesByBookChapter.set(key, []);
    }
    versesByBookChapter.get(key)!.push(v);
  }
  versesLoaded = true;
}

export function getBooks(): BibleBook[] {
  return books;
}

export function getBookByAbrev(abrev: string): BibleBook | undefined {
  return bookByAbrev.get(abrev);
}

export function getBookByName(name: string): BibleBook | undefined {
  return bookByName.get(name.toLowerCase());
}

export function findBookByQuery(query: string): BibleBook | undefined {
  return bookByName.get(query.toLowerCase())
    ?? books.find((b) => b.abrev.toLowerCase() === query.toLowerCase())
    ?? books.find((b) => b.name.toLowerCase().startsWith(query.toLowerCase()));
}

export async function getChapter(
  bookAbrev: string,
  chapter: number,
): Promise<{ book: BibleBook; verses: BibleVerse[] } | null> {
  await ensureVersesLoaded();
  const book = bookByAbrev.get(bookAbrev);
  if (!book) return null;
  const key = `${bookAbrev}|${chapter}`;
  const chapterVerses = versesByBookChapter.get(key);
  if (!chapterVerses) return null;
  return { book, verses: chapterVerses };
}

export async function getChapterByBookName(
  bookName: string,
  chapter: number,
): Promise<{ book: BibleBook; verses: BibleVerse[] } | null> {
  const book = getBookByName(bookName);
  if (!book) return null;
  return getChapter(book.abrev, chapter);
}

export interface SearchResult {
  book: BibleBook;
  chapter: number;
  verse_number: number;
  text: string;
  reference: string;
}

export async function searchBible(
  query: string,
  testament?: 'AT' | 'NT',
): Promise<SearchResult[]> {
  await ensureVersesLoaded();
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const v of verses) {
    if (v.text.toLowerCase().includes(q)) {
      if (testament) {
        const book = bookByAbrev.get(v.book_abrev);
        if (!book || book.testament !== testament) continue;
      }
      const book = bookByAbrev.get(v.book_abrev);
      if (!book) continue;
      results.push({
        book,
        chapter: v.chapter,
        verse_number: v.verse_number,
        text: v.text,
        reference: `${book.name} ${v.chapter}:${v.verse_number}`,
      });
    }
  }

  return results;
}

export function getBooksByTestament(testament: 'AT' | 'NT'): BibleBook[] {
  return books.filter((b) => b.testament === testament);
}
