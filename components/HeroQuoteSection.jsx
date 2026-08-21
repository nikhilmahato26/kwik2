"use client";

import { motion, useReducedMotion } from "motion/react";
import BookingForm from "@/components/BookingForm";

export default function HeroQuoteSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-off-white px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto -mt-16 max-w-3xl sm:-mt-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BookingForm title="Get a Quick Quote" ctaLabel="GET A QUOTE" compact />
        </motion.div>
      </div>
    </section>
  );
}
