import { motion } from 'framer-motion';
import {
  FaBolt,
  FaChair,
  FaDesktop,
  FaKeyboard,
  FaMicrochip,
  FaMouse,
  FaNetworkWired,
  FaTv,
} from 'react-icons/fa';

const setupItems = [
  { title: '8 High-End Gaming PCs', icon: FaDesktop },
  { title: 'RTX 5060 Graphics Card', icon: FaBolt },
  { title: 'Intel Core i7 13th Generation', icon: FaMicrochip },
  { title: '144Hz Gaming Monitor', icon: FaTv },
  { title: 'Mechanical RGB Keyboard', icon: FaKeyboard },
  { title: 'Gaming Mouse', icon: FaMouse },
  { title: 'Comfortable Gaming Chairs', icon: FaChair },
  { title: 'High-Speed Internet', icon: FaNetworkWired },
];

export default function Setup() {
  return (
    <section id="setup" className="bg-obsidian px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <p className="section-kicker">The Setup</p>
          <h2 className="section-title">Built for high frame rates and long sessions.</h2>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {setupItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                whileHover={{ y: -6 }}
                className="group rounded-lg border border-white/10 bg-carbon p-6 shadow-premium transition-colors hover:border-plasma/50"
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 text-xl text-plasma transition group-hover:bg-plasma/20 group-hover:text-white">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-white">{item.title}</h3>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
