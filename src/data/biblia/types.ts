export interface BibleBook {
  id: number;
  name: string;
  abrev: string;
  chapters: number;
  testament: 'AT' | 'NT';
}

export interface BibleVerse {
  id: number;
  version: string;
  book_id: number;
  book_abrev: string;
  chapter: number;
  verse_number: number;
  text: string;
}
