import { motion } from 'framer-motion';
import { FaClock, FaCrown, FaMoon } from 'react-icons/fa';

const plans = [
  {
    title: 'Hourly Play',
    price: '\u20B9100 / Hour',
    detail: 'Perfect for casual gaming sessions.',
    icon: FaClock,
  },
  {
    title: '3 Hour Pack',
    price: '\u20B9250',
    detail: 'Best Value',
    badge: 'Most Popular',
    highlighted: true,
    icon: FaCrown,
  },
  {
    title: 'Night Pack',
    price: '\u20B9700',
    detail: 'Unlimited Gaming',
    subdetail: '10 PM - 6 AM',
    icon: FaMoon,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#0D0D0D] px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mb-12 max-w-3xl"
        >
          <p className="section-kicker">Pricing</p>
          <h2 className="section-title">Pricing</h2>
          <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">Affordable gaming for everyone.</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.article
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.62, delay: index * 0.08 }}
                whileHover={{ y: -7 }}
                className={
                  'relative overflow-hidden rounded-lg border p-7 shadow-premium backdrop-blur transition sm:p-8 ' +
                  (plan.highlighted
                    ? 'border-plasma/70 bg-plasma/10 shadow-[0_0_42px_rgba(59,130,246,0.25)]'
                    : 'border-white/10 bg-white/5 hover:border-white/25')
                }
              >
                {plan.badge && (
                  <span className="absolute right-5 top-5 rounded-lg bg-white px-3 py-2 text-xs font-black uppercase text-black">
                    {plan.badge}
                  </span>
                )}
                <span className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/10 text-xl text-plasma">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-8 font-heading text-5xl leading-none text-white">{plan.title}</h3>
                <p className="mt-5 font-heading text-6xl leading-none text-white">{plan.price}</p>
                <p className="mt-5 text-base leading-7 text-white/70">{plan.detail}</p>
                {plan.subdetail && <p className="mt-2 text-sm font-bold uppercase text-white/40">{plan.subdetail}</p>}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
