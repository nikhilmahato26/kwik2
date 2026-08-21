"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] overflow-hidden rounded-card"
        >
          <Image
            src="https://picsum.photos/seed/kwik2travels-city-drive/1200/900"
            alt="Cab travelling through a city street, representing Kwik2Travels local and outstation service"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
            About Kwik2Travels
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-text-dark/75">
            Kwik2Travels provides convenient cab and travel solutions for
            local, airport and outstation journeys. With a selection of
            comfortable vehicles including Innova Crysta, Ertiga and Swift
            Dzire, customers can choose a suitable ride for their travel
            requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
