"use client";

import { motion, useReducedMotion } from "motion/react";
import { iconMap } from "@/lib/icon-map";
import { business } from "@/data/business";

export default function WhyChooseUs() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-maroon-deep px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl font-display text-3xl font-bold text-white sm:text-4xl"
        >
          Why Choose Kwik2Travels
        </motion.h2>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {business.whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon] ?? iconMap.BadgeCheck;
            return (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="flex flex-col items-start gap-3"
              >
                <div className="flex size-12 items-center justify-center rounded-[10px] bg-gold/15">
                  <Icon className="size-6 text-gold-light" aria-hidden />
                </div>
                <p className="text-[15px] font-semibold leading-snug text-white">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
