import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function OpeningHours() {
  return (
    <section id="opening-hours" className="relative overflow-hidden bg-[#0D0D0D] px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-kicker">Opening Hours</p>
          <h2 className="section-title">Opening Hours</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -6 }}
          className="mx-auto mt-12 max-w-3xl rounded-lg border border-white/10 bg-white/5 p-7 text-center shadow-premium backdrop-blur sm:p-10"
        >
          <div className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-black uppercase text-emerald-300">
            <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.75)]" />
            Open Today
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-black/30 p-6">
              <FaCalendarAlt className="mx-auto text-2xl text-plasma" aria-hidden="true" />
              <p className="mt-4 text-sm font-black uppercase text-white/40">Monday - Sunday</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-6">
              <FaClock className="mx-auto text-2xl text-ember" aria-hidden="true" />
              <p className="mt-4 text-sm font-black uppercase text-white/40">10:00 AM - 2:00 AM</p>
            </div>
          </div>
          <p className="mt-8 font-heading text-5xl leading-none text-white">Open 7 Days a Week</p>
        </motion.div>
      </div>
    </section>
  );
}
