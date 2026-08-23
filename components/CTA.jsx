"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA({ business }) {
  const reduce = useReducedMotion();

  return (
    <section className="bg-maroon px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Ready for Your Next Journey?
        </h2>
        <p className="mt-4 text-lg text-white/85">
          Book a comfortable ride with Kwik2Travels.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button as={Link} href="/booking" variant="gold" size="lg">
            BOOK NOW
          </Button>
          <Button as="a" href={business.phoneTel} variant="outlineLight" size="lg">
            <Phone className="size-4" aria-hidden />
            CALL NOW
          </Button>
        </div>

        <a
          href={business.phoneTel}
          className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-gold-light"
        >
          <Phone className="size-5" aria-hidden />
          {business.phoneDisplay}
        </a>
      </motion.div>
    </section>
  );
}
