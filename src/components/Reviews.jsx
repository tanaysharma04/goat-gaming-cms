import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaTimes } from "react-icons/fa";
import {
  getApprovedReviews,
  submitReview,
} from "../services/reviewService";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const [hoverRating, setHoverRating] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  async function loadReviews() {
    try {
      setLoading(true);

      const data = await getApprovedReviews();

      setReviews(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !review.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setSubmitting(true);

      await submitReview({
        name,
        rating,
        review,
      });

      alert(
        "Thank you! Your review has been submitted for approval."
      );

      setName("");
      setRating(5);
      setReview("");

      setShowModal(false);

      loadReviews();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="reviews"
      className="bg-obsidian px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <p className="section-kicker">
              Reviews
            </p>

            <h2 className="section-title">
              What Gamers Say
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-full bg-trophy px-6 py-3 font-bold text-black transition hover:scale-105"
          >
            Leave Review
          </button>

        </motion.div>

        {loading ? (

          <div className="text-center text-white/60 py-20">
            Loading Reviews...
          </div>

        ) : (

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {reviews.length === 0 ? (

  <div className="col-span-full py-16 text-center">
    <h3 className="text-2xl font-bold text-white">
      No reviews yet
    </h3>

    <p className="mt-3 text-white/60">
      Be the first gamer to leave a review!
    </p>
  </div>

) : (

  reviews.map((review) => (

    <motion.article
      key={review.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="rounded-xl border border-white/10 bg-carbon p-6 shadow-premium transition hover:border-trophy/40"
    >

      <div className="flex gap-1 text-trophy">
        {Array.from({ length: review.rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

      <p className="mt-5 min-h-24 leading-8 text-white/70">
        "{review.review}"
      </p>

      <p className="mt-6 font-bold">
        — {review.name}
      </p>

    </motion.article>

  ))

)}
</div>
        )}
        <AnimatePresence>
                    {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.form
                onSubmit={handleSubmit}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-carbon p-8 shadow-2xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-black text-white">
                    Leave a Review
                  </h2>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-white/60 transition hover:text-white"
                  >
                    <FaTimes size={22} />
                  </button>
                </div>

                <input
                  className="mb-5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-trophy"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="mb-6 flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={34}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="cursor-pointer transition duration-200 hover:scale-125"
                      color={
                        star <= (hoverRating || rating)
                          ? "#FFD54A"
                          : "#555"
                      }
                    />
                  ))}
                </div>

                <textarea
                  rows={5}
                  placeholder="Share your gaming experience..."
                  className="mb-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-trophy"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />

                <button
                  disabled={submitting}
                  className="w-full rounded-xl bg-trophy py-4 text-lg font-black text-black transition hover:scale-[1.02] disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Review"}
                </button>

                <p className="mt-5 text-center text-sm text-white/50">
                  Reviews are published after approval by the cafe owner.
                </p>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}