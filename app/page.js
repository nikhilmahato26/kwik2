import Hero from "@/components/Hero";
import Fleet from "@/components/Fleet";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import CTA from "@/components/CTA";
import HolidayCollections from "@/components/HolidayCollections";
import HolidayCard from "@/components/HolidayCard";
import { holidayPackages } from "@/data/holidays";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <HolidayCollections />

      {/* Featured Packages Section */}
      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24 pt-8 sm:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Holiday Packages
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Handpicked itineraries for unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {holidayPackages.slice(0, 3).map((pkg) => (
              <HolidayCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/holidays" 
              className="inline-block rounded-lg bg-maroon-deep px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-colors hover:bg-maroon"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      <Fleet />
      <Services />
      <WhyChooseUs />
      <About />
      <CTA />
    </>
  );
}
