import { motion } from 'framer-motion';
import { FaHourglassHalf, FaLock, FaUserAstronaut } from 'react-icons/fa';
import { useGames } from '../hooks/useGames.jsx';
import { CmsErrorState, CmsLoadingState, EmptyState } from './CmsMessage.jsx';

export default function ComingSoon() {
  const { comingSoonGames, isLoading, error } = useGames();

  return (
    <section id="coming-soon" className="relative overflow-hidden bg-obsidian px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mb-12 max-w-4xl"
        >
          <p className="section-kicker">Coming Soon</p>
          <h2 className="section-title">Coming Soon</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            These blockbuster titles are not yet available to play, but they'll be added to our gaming library as soon as they are released or supported.
          </p>
        </motion.div>

        {isLoading && <CmsLoadingState title="Loading upcoming games..." />}
        {error && <CmsErrorState message={error.message} />}

        {!isLoading && !error && (
          comingSoonGames.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {comingSoonGames.map((game, index) => (
                <ComingSoonCard key={game.id} game={game} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState message="No coming soon games." />
          )
        )}
      </div>
    </section>
  );
}

function ComingSoonCard({ game, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
      className="group relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-carbon shadow-premium"
      style={{
        '--accent': game.themeColors.primary,
        '--accent-secondary': game.themeColors.secondary,
        '--accent-shadow': game.themeColors.shadow,
      }}
    >
      <img
        src={game.image}
        alt={game.title + ' promotional artwork'}
        className="absolute inset-0 h-full w-full object-cover opacity-70 saturate-[0.82] transition duration-700 group-hover:scale-105 group-hover:opacity-[0.82] group-hover:saturate-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/80 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-shadow),transparent_38%)] opacity-60 transition group-hover:opacity-100" />
      <div className="absolute inset-0 border border-transparent transition group-hover:border-[var(--accent)]" />

      <div className="relative flex min-h-[520px] flex-col justify-between p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-xs font-black uppercase text-white/80 backdrop-blur">
            <FaLock aria-hidden="true" />
            {game.status}
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/10 text-white/75 backdrop-blur transition group-hover:text-[var(--accent)]">
            <FaHourglassHalf aria-hidden="true" />
          </span>
        </div>

        <div>
          <div className="mb-5 h-1 w-24 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-[0_0_28px_var(--accent-shadow)]" />
          <h3 className="font-heading text-[clamp(3rem,6vw,5.4rem)] leading-none text-white">
            {game.title}
          </h3>

          <div className="mt-7 grid gap-3 text-sm text-white/70">
            <span className="flex items-center gap-3">
              <FaUserAstronaut className="text-[var(--accent)]" aria-hidden="true" />
              Developer: {game.developer}
            </span>
            <span className="inline-flex w-fit rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold uppercase text-white/70">
              {game.genre}
            </span>
          </div>

          <p className="mt-8 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm font-bold uppercase text-white/80 backdrop-blur">
            Launching Soon at GOAT GAMING
          </p>
        </div>
      </div>
    </motion.article>
  );
}
