"use client";

import { motion, useReducedMotion } from "motion/react";
import ServiceCard from "@/components/ServiceCard";
import { business } from "@/data/business";

export default function Services({ showIntro = true }) {
  const reduce = useReducedMotion();
  const [featured, ...rest] = business.services;

  return (
    <section id="services" className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {showIntro ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl font-bold text-maroon-deep sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-text-dark/70">
              From a quick local ride to a planned outstation tour, Kwik2Travels
              covers the trips that matter to you.
            </p>
          </motion.div>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5"
          >
            <ServiceCard service={featured} featured />
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-7">
            {rest.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
