"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/data/business";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-maroon-deep">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Premium sedan travelling along a scenic Indian highway at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-maroon-deep/60" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 pt-18 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Your Journey, Our Priority
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
            Comfortable and reliable cab services for local, outstation and
            airport travel.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
            className="mt-8 inline-flex items-center gap-2 text-lg font-semibold text-gold-light"
          >
            <Phone className="size-5" aria-hidden />
            {business.phoneDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
