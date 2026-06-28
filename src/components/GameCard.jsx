import { motion } from 'framer-motion';
import { FaCheckCircle, FaGamepad, FaPlay, FaUserAstronaut } from 'react-icons/fa';

export default function GameCard({ game, index }) {
  const isReversed = index % 2 === 1;
  const direction = isReversed ? 80 : -80;
  const orderClass = isReversed ? 'lg:[&>*:first-child]:order-2' : '';

  return (
    <motion.article
      initial={{ opacity: 0, x: direction }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-carbon shadow-premium"
      style={{
        '--accent': game.themeColors.primary,
        '--accent-secondary': game.themeColors.secondary,
        '--accent-shadow': game.themeColors.shadow,
      }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
        <div className="absolute -right-24 top-8 h-56 w-56 rounded-full bg-[var(--accent)] opacity-[0.16] blur-3xl" />
        <div className="absolute -left-24 bottom-8 h-56 w-56 rounded-full bg-[var(--accent-secondary)] opacity-[0.12] blur-3xl" />
      </div>

      <div className={'grid min-h-[520px] items-stretch lg:grid-cols-2 ' + orderClass}>
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
          <img
            src={game.image}
            alt={game.title + ' placeholder artwork'}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-carbon/60" />
          <div className="absolute left-5 top-5 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs font-bold uppercase text-white/80 backdrop-blur">
            {game.status}
          </div>
        </div>

        <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold uppercase text-white/70">
            <FaGamepad aria-hidden="true" />
            PlayStation Showcase
          </p>
          <h3 className="font-heading text-[clamp(3rem,8vw,6.6rem)] leading-none text-white">
            {game.title}
          </h3>
          <div className="mt-5 h-1 w-28 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]" />
          <p className="mt-7 max-w-xl text-base leading-8 text-white/70">{game.description}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {(game.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold uppercase text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            <span className="flex items-center gap-3">
              <FaUserAstronaut className="text-[var(--accent)]" aria-hidden="true" />
              Developer: {game.developer}
            </span>
            <span className="flex items-center gap-3">
              <FaCheckCircle className="text-[var(--accent-secondary)]" aria-hidden="true" />
              Platform: {game.platform}
            </span>
          </div>

          <a
            href="#location"
            className="mt-9 inline-flex w-fit items-center gap-3 rounded-lg border border-white/10 bg-white px-5 py-4 text-sm font-black uppercase text-black transition duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white hover:shadow-[0_0_34px_var(--accent-shadow)]"
          >
            Play at GOAT GAMING
            <FaPlay aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
