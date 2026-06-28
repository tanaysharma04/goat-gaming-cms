import { motion } from 'framer-motion';

export function CmsLoadingState({ title = 'Loading games...' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-white/10 bg-carbon px-6 py-16 text-center shadow-premium"
    >
      <div className="mx-auto mb-5 h-12 w-12 animate-pulse rounded-full border border-plasma/40 bg-plasma/10 shadow-glow" />
      <p className="font-heading text-5xl leading-none text-white">{title}</p>
      <p className="mt-4 text-sm text-white/55">Syncing the latest library from GOAT GAMING CMS.</p>
    </motion.div>
  );
}

export function CmsErrorState({ message = 'Could not load CMS data.' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-ember/30 bg-carbon px-6 py-16 text-center shadow-premium"
    >
      <p className="font-heading text-5xl leading-none text-white">Games unavailable.</p>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60">{message}</p>
    </motion.div>
  );
}

export function EmptyState({ message }) {
  return (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="rounded-lg border border-white/10 bg-carbon px-6 py-16 text-center shadow-premium"
    >
      <p className="font-heading text-5xl leading-none text-white">{message}</p>
    </motion.div>
  );
}
