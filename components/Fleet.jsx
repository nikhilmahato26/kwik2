"use client";

import { motion, useReducedMotion } from "motion/react";
import VehicleCard from "@/components/VehicleCard";

export default function Fleet({ vehicles, showIntro = true }) {
  const reduce = useReducedMotion();

  return (
    <section id="fleet" className="bg-off-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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
              Our Fleet
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-text-dark/70">
              Choose from our available vehicles for a comfortable ride suited
              to your trip.
            </p>
          </motion.div>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.slug}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
