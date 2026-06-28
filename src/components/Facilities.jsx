import { motion } from 'framer-motion';
import {
  FaBolt,
  FaCar,
  FaChair,
  FaCheck,
  FaCocktail,
  FaFan,
  FaGamepad,
  FaHeadphones,
  FaKeyboard,
  FaNetworkWired,
  FaRestroom,
} from 'react-icons/fa';

const facilities = [
  { title: 'Air Conditioned', icon: FaFan },
  { title: 'High-Speed Fiber Internet', icon: FaNetworkWired },
  { title: 'RTX Gaming PCs', icon: FaGamepad },
  { title: 'Mechanical RGB Keyboards', icon: FaKeyboard },
  { title: 'Gaming Headsets', icon: FaHeadphones },
  { title: 'Comfortable Gaming Chairs', icon: FaChair },
  { title: 'Snacks & Cold Drinks', icon: FaCocktail },
  { title: 'Clean Washrooms', icon: FaRestroom },
  { title: 'Power Backup', icon: FaBolt },
  { title: 'Free Parking', icon: FaCar },
];

export default function Facilities() {
  return (
    <section id="facilities" className="bg-obsidian px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mb-12 max-w-3xl"
        >
          <p className="section-kicker">Facilities</p>
          <h2 className="section-title">Facilities</h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.article
                key={facility.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.035 }}
                whileHover={{ y: -6 }}
                className="group rounded-lg border border-white/10 bg-carbon p-5 shadow-premium transition hover:border-plasma/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-plasma transition group-hover:bg-plasma/20 group-hover:text-white">
                    <Icon aria-hidden="true" />
                  </span>
                  <FaCheck className="text-sm text-emerald-400" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-bold leading-6 text-white">{facility.title}</h3>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
