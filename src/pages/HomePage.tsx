import Hero from '../components/Hero.tsx';
import ActivityGrid from '../components/ActivityGrid.tsx';
import Streaming from '../components/Streaming.tsx';
import SocialGrid from '../components/SocialGrid.tsx';
import BibleSection from '../components/BibleSection.tsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActivityGrid />
      <Streaming />
      <SocialGrid />
      <BibleSection />
    </>
  );
}
