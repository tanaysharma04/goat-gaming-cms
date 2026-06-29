import { motion } from 'framer-motion';
import { FaGamepad, FaLocationArrow, FaRocket } from 'react-icons/fa';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[94svh] items-center overflow-hidden bg-hero-texture px-5 pt-24 sm:px-8"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-[0.48] mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1800&q=85')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,9,9,0.92),rgba(9,9,9,0.36),rgba(9,9,9,0.92))]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-44 bg-gradient-to-t from-obsidian to-transparent" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="mb-5 inline-flex rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase text-white/80 backdrop-blur">
          Assotech Hi-Street, Crossing Republik, Ghaziabad
        </p>
        <h1 className="font-heading text-[clamp(4.6rem,16vw,10.5rem)] leading-[0.84] text-white">
          GOAT GAMING
        </h1>
        <h2 className="mt-6 font-heading text-[clamp(2rem,6vw,4.6rem)] leading-none text-white/90">
          Next Generation Gaming Experience
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
          Experience AAA games on high-end RTX gaming PCs.
        </p>
        <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <a href="#games" className="btn-primary w-full sm:w-auto">
            <FaGamepad aria-hidden="true" />
            Available Games
          </a>
          <a
            href="#coming-soon"
            className="btn-secondary w-full border-plasma/30 bg-plasma/10 shadow-[0_0_26px_rgba(59,130,246,0.18)] hover:border-plasma/70 hover:bg-plasma/20 hover:shadow-[0_0_34px_rgba(59,130,246,0.32)] sm:w-auto"
          >
            <FaRocket aria-hidden="true" />
            Coming Soon
          </a>
          <a href="#location" className="btn-secondary w-full sm:w-auto">
            <FaLocationArrow aria-hidden="true" />
            Visit Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
