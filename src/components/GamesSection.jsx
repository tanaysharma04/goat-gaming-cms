import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGames } from '../hooks/useGames.jsx';
import { getInitials, getSuggestionScore, matchesSearch, normalizeText } from '../utils/normalizeSearch.js';
import { CmsErrorState, CmsLoadingState, EmptyState } from './CmsMessage.jsx';
import GameCard from './GameCard.jsx';

const filters = ['All', 'Action', 'Open World', 'Racing', 'FPS', 'Multiplayer', 'Survival', 'Horror'];

const filterAliases = {
  Action: ['action'],
  'Open World': ['open world'],
  Racing: ['racing'],
  FPS: ['fps', 'first person', 'shooter'],
  Multiplayer: ['multiplayer', 'online multiplayer'],
  Survival: ['survival'],
  Horror: ['horror'],
};

const suggestionIcons = {
  "Marvel's Spider-Man 2": 'SM',
  'Ghost of Yōtei': 'GY',
  Fortnite: 'FN',
  'Forza Horizon 5': 'FH',
  Minecraft: 'MC',
  "Marvel's Wolverine": 'W',
  'Grand Theft Auto VI': 'VI',
  'Dune: Awakening': 'D',
};

function matchesFilter(game, activeFilter) {
  if (activeFilter === 'All') return true;

  const searchableTags = (game.tags ?? []).map((tag) => normalizeText(tag));
  const normalizedGenre = normalizeText(game.genre);

  return filterAliases[activeFilter].some((alias) => {
    const normalizedAlias = normalizeText(alias);
    return normalizedGenre.includes(normalizedAlias) || searchableTags.some((tag) => tag.includes(normalizedAlias));
  });
}

export default function GamesSection() {
  const { games, availableGames, isLoading, error } = useGames();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredGames = useMemo(() => {
    return availableGames.filter((game) => {
      return matchesSearch(game, searchTerm) && matchesFilter(game, activeFilter);
    });
  }, [activeFilter, availableGames, searchTerm]);

  const titleSuggestions = useMemo(() => {
    if (!normalizeText(searchTerm)) return [];

    return games
      .filter((game) => matchesSearch(game, searchTerm))
      .map((game) => ({
        ...game,
        targetId: game.cmsStatus === 'Coming Soon' ? 'coming-soon' : 'games',
        suggestionIcon: suggestionIcons[game.title] ?? getInitials(game.title).slice(0, 2).toUpperCase(),
      }))
      .sort((first, second) => getSuggestionScore(first, searchTerm) - getSuggestionScore(second, searchTerm))
      .slice(0, 6);
  }, [games, searchTerm]);

  const isDropdownVisible = isSearchOpen;

  function handleSuggestionClick(game) {
    if (game.targetId === 'games') {
      setSearchTerm(game.title);
      setActiveFilter('All');
    }

    setIsSearchOpen(false);
    window.requestAnimationFrame(() => {
      document.getElementById(game.targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <section id="games" className="relative overflow-hidden bg-[#0D0D0D] px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">Available Games</p>
            <h2 className="section-title">AAA titles installed and ready to launch.</h2>
          </div>
        </div>

        <div ref={searchRef} className="relative z-20 mx-auto mb-12 w-full max-w-[480px]">
          <motion.label
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            htmlFor="game-search"
            className="group relative block"
          >
            <span className="absolute -inset-px rounded-full bg-gradient-to-r from-white/10 via-plasma/20 to-ember/20 opacity-70 blur-[1px] transition duration-300 group-hover:opacity-100" aria-hidden="true" />
            <span className="relative flex h-14 items-center rounded-full border border-white/10 bg-black/40 shadow-[0_16px_50px_rgba(0,0,0,0.38)] backdrop-blur-xl transition duration-300 group-hover:-translate-y-0.5 group-hover:border-plasma/30 group-hover:shadow-[0_18px_56px_rgba(59,130,246,0.16)] focus-within:border-plasma/60 focus-within:bg-black/60 focus-within:shadow-[0_20px_64px_rgba(59,130,246,0.25)]">
              <FaSearch className="ml-5 shrink-0 text-sm text-white/40 transition group-focus-within:text-plasma group-hover:text-white/70" aria-hidden="true" />
              <input
                id="game-search"
                type="search"
                value={searchTerm}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder="Search your favorite game..."
                className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-white caret-plasma outline-none transition placeholder:text-white/40 focus:placeholder:text-white/60"
              />
            </span>
          </motion.label>

          <AnimatePresence>
            {isDropdownVisible && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 12, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 right-0 top-full overflow-hidden rounded-3xl border border-white/10 bg-[#090909]/95 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.58)] backdrop-blur-2xl"
              >
                <p className="px-2 text-[0.68rem] font-black uppercase text-white/40">Genre Filters</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={
                          'rounded-full border px-3.5 py-2 text-xs font-black uppercase transition duration-300 ' +
                          (isActive
                            ? 'border-plasma bg-plasma text-white shadow-[0_0_22px_rgba(59,130,246,0.26)]'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:bg-white/10 hover:text-white')
                        }
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>

                {normalizeText(searchTerm) && (
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="px-2 text-[0.68rem] font-black uppercase text-white/40">Live Suggestions</p>
                    <div className="mt-2 grid gap-2">
                      {titleSuggestions.length > 0 ? (
                        titleSuggestions.map((game) => (
                          <button
                            key={game.id}
                            type="button"
                            onClick={() => handleSuggestionClick(game)}
                            className="group/suggestion flex w-full items-center gap-3 rounded-2xl border border-transparent bg-white/0 px-3 py-3 text-left transition duration-300 hover:border-plasma/25 hover:bg-white/10"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-[0.68rem] font-black text-plasma transition group-hover/suggestion:bg-plasma group-hover/suggestion:text-white">
                              {game.suggestionIcon}
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-bold text-white">{game.title}</span>
                              <span className="block truncate text-xs text-white/40">{game.developer}</span>
                            </span>
                          </button>
                        ))
                      ) : (
                        <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white/60">
                          No title suggestions.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isLoading && <CmsLoadingState />}
        {error && <CmsErrorState message={error.message} />}

        {!isLoading && !error && (
          <AnimatePresence mode="popLayout">
            {filteredGames.length > 0 ? (
              <motion.div layout className="grid gap-8 lg:gap-10">
                {filteredGames.map((game, index) => (
                  <motion.div
                    layout
                    key={game.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35 }}
                  >
                    <GameCard game={game} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState message="No games found." />
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
