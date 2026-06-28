import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    quote: 'Best gaming setup in Ghaziabad! Smooth gameplay and amazing atmosphere.',
    name: 'Rahul Sharma',
  },
  {
    quote: 'RTX gaming PCs are incredibly fast. Loved the experience.',
    name: 'Aryan Gupta',
  },
  {
    quote: 'Very comfortable chairs and great internet speed.',
    name: 'Aman Verma',
  },
  {
    quote: 'Perfect place to play with friends.',
    name: 'Harsh Jain',
  },
  {
    quote: 'Affordable pricing and premium setup.',
    name: 'Aditya Singh',
  },
  {
    quote: 'My favorite gaming cafe.',
    name: 'Rohan Mehta',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-obsidian px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mb-12 max-w-3xl"
        >
          <p className="section-kicker">Reviews</p>
          <h2 className="section-title">What Gamers Say</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="rounded-lg border border-white/10 bg-carbon p-6 shadow-premium transition hover:border-trophy/50"
            >
              <div className="flex gap-1 text-trophy">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <FaStar key={starIndex} aria-hidden="true" />
                ))}
              </div>
              <p className="mt-6 min-h-20 text-base leading-8 text-white/70">"{review.quote}"</p>
              <p className="mt-6 text-sm font-black uppercase text-white">- {review.name}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
