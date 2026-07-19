import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';
import MusicBar from './MusicBar.tsx';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg pb-24">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MusicBar />
    </div>
  );
}
