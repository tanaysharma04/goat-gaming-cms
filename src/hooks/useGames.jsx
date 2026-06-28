import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchGamesSheet } from '../services/googleSheets.js';

const GamesContext = createContext(null);

export function GamesProvider({ children }) {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGames() {
      try {
        const sheetGames = await fetchGamesSheet();
        if (!isMounted) return;
        setGames(sheetGames.filter((game) => game.active));
        setError(null);
      } catch (caughtError) {
        if (!isMounted) return;
        setError(caughtError);
        setGames([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadGames();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => {
    const availableGames = games.filter((game) => game.cmsStatus === 'Available');
    const comingSoonGames = games.filter((game) => game.cmsStatus === 'Coming Soon');

    return {
      games,
      availableGames,
      comingSoonGames,
      isLoading,
      error,
    };
  }, [error, games, isLoading]);

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>;
}

export function useGames() {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error('useGames must be used inside a GamesProvider.');
  }

  return context;
}
