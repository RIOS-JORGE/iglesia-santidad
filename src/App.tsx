import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import GalleryPage from './pages/GalleryPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import BibleLayout from './pages/biblia/BibleLayout.tsx';
import BibleHomePage from './pages/biblia/BibleHomePage.tsx';
import BooksPage from './pages/biblia/BooksPage.tsx';
import ChapterPage from './pages/biblia/ChapterPage.tsx';
import SearchPage from './pages/biblia/SearchPage.tsx';

const BlogPostPage = lazy(() => import('./pages/BlogPostPage.tsx'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="galeria" element={<GalleryPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="biblia" element={<BibleLayout />}>
            <Route index element={<BibleHomePage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path=":bookName/:chapterNum" element={<ChapterPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
