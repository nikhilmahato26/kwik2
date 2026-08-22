"use client";

import Link from "next/link";
import { holidayCollections } from "@/data/holidays";
import { MapPin } from "lucide-react";

export default function HolidayCollections() {
  return (
    <section className="bg-gray-50/50 pt-16 pb-8 sm:pt-24 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Holiday Packages
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 lg:gap-12">
          {holidayCollections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/holidays?category=${collection.slug}`}
              className="group flex flex-col items-center gap-4 text-center transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-square w-full max-w-[140px] sm:max-w-[160px] overflow-hidden rounded-full shadow-md transition-shadow duration-300 group-hover:shadow-lg">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                {collection.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
