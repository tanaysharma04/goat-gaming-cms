import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Setup from './components/Setup.jsx';
import GamesSection from './components/GamesSection.jsx';
import ComingSoon from './components/ComingSoon.jsx';
import Pricing from './components/Pricing.jsx';
import Facilities from './components/Facilities.jsx';
import OpeningHours from './components/OpeningHours.jsx';
import Reviews from './components/Reviews.jsx';
import Location from './components/Location.jsx';
import Footer from './components/Footer.jsx';
import { GamesProvider } from './hooks/useGames.jsx';

export default function App() {
  return (
    <GamesProvider>
      <div className="min-h-screen bg-obsidian font-body text-white">
        <Navbar />
        <main>
          <Hero />
          <GamesSection />
          <ComingSoon />
          <OpeningHours />
          <Location />
          <Setup />
          <Pricing />
          <Reviews />
        </main>
        <Footer />
      </div>
    </GamesProvider>
  );
}
