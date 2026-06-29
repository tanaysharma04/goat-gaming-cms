import { motion } from 'framer-motion';
import { FaDirections, FaMapMarkerAlt } from 'react-icons/fa';

const mapsUrl = 'https://www.google.com/maps/place/Assotech+Hi-Street/data=!4m7!3m6!1s0x390cf33fb354907f:0xa28a7ec2d7b454b9!8m2!3d28.626686!4d77.4382843!16s%2Fg%2F11qr17rp_9!19sChIJf5BUsz_zDDkRuVS018J-iqI?authuser=0&hl=en&rclk=1';

export default function Location() {
  return (
    <section id="location" className="bg-obsidian px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center rounded-lg border border-white/10 bg-carbon p-7 shadow-premium sm:p-9"
        >
          <p className="section-kicker">Location</p>
          <h2 className="section-title">Visit GOAT GAMING</h2>
          <address className="mt-8 not-italic text-lg leading-9 text-white/70">
            2nd floor,
            Assotech Hi-Street,
            <br />
            Crossing Republik,
            <br />
            Ghaziabad,
            <br />
            Uttar Pradesh
          </address>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-primary mt-9 w-fit">
            <FaDirections aria-hidden="true" />
            Get Directions
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-[#121212] shadow-premium"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.32),transparent_28%),radial-gradient(circle_at_62%_62%,rgba(255,59,59,0.22),transparent_24%)]" />
          <div className="absolute inset-x-0 top-1/2 h-1 bg-plasma/70 shadow-glow" />
          <div className="absolute bottom-0 left-1/3 top-0 w-1 bg-ember/60" />
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-white/15 bg-black/50 text-3xl text-white shadow-glow backdrop-blur">
            <FaMapMarkerAlt aria-hidden="true" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/10 bg-black/50 p-4 text-sm text-white/70 backdrop-blur">
            Play with your friends
          </div>
        </motion.div>
      </div>
    </section>
  );
}
