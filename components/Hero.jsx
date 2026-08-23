"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Phone, CheckCircle, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

export default function Hero({ business }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-950 pt-24 pb-16 lg:pt-28 lg:pb-20">
      {/* Background Image with Neutral Less-Reddish Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Scenic highway journey travel view"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Sleek neutral dark overlay - replaces heavy reddish tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60 backdrop-brightness-90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Headline, Trust Signals & Call to Action */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/40 px-3.5 py-1.5 backdrop-blur-sm">
              <Sparkles className="size-3.5 text-gold" />
              <span className="text-xs font-medium uppercase tracking-wider text-gold-light">
                {business.slogan || "We Are Too Quicker"}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.12] text-white sm:text-4xl lg:text-5xl">
              Your Journey, <br />
              <span className="text-gold-light">Our Priority</span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg">
              Seamless booking for Holidays, Flights, Hotels, Cars, Cabs &
              Visa — tailored for your comfort and peace of mind.
            </p>

            {/* Quick Benefits */}
            <div className="mt-6 flex flex-col gap-2.5">
              {[
                "Instant WhatsApp confirmation & quotes",
                "Clean, sanitized cabs with professional drivers",
                "Best rates guaranteed with zero hidden fees",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle className="size-4 shrink-0 text-gold" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons & Phone */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button as="a" href={business.phoneTel} variant="gold" size="lg">
                <Phone className="size-4" aria-hidden />
                CALL NOW
              </Button>
              <div className="flex flex-col gap-1">
                <a
                  href={business.phoneTel}
                  className="inline-flex items-center gap-2 text-base font-semibold text-white/90 transition-colors hover:text-gold-light"
                >
                  <Phone className="size-4 text-gold" aria-hidden />
                  {business.phoneDisplay}
                </a>
                {business.phoneDisplay2 && (
                  <a
                    href={business.phoneTel2}
                    className="inline-flex items-center gap-2 text-base font-semibold text-white/90 transition-colors hover:text-gold-light"
                  >
                    <Phone className="size-4 text-gold" aria-hidden />
                    {business.phoneDisplay2}
                  </a>
                )}
              </div>
            </div>

            {/* Rating badge */}
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-gray-300">
                Rated <strong className="text-white">4.9/5</strong> by 5,000+ happy travellers
              </p>
            </div>
          </motion.div>

          {/* Right Column: Multi-Tab Booking Form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7"
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
