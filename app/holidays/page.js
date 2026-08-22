import PageHeader from "@/components/PageHeader";
import HolidayCollections from "@/components/HolidayCollections";
import HolidayCard from "@/components/HolidayCard";
import { holidayPackages, holidayCollections } from "@/data/holidays";

export const metadata = {
  title: "Holiday Packages | Domestic & International Tours",
  description:
    "Explore Kwik2Travels' exclusive holiday packages, including domestic tours, international tours, beach vacations, and wildlife adventures.",
};

export default async function HolidaysPage({ searchParams }) {
  const { category } = await searchParams;
  
  const filteredPackages = category 
    ? holidayPackages.filter((pkg) => pkg.category === category)
    : holidayPackages;

  const currentCategory = category
    ? holidayCollections.find((c) => c.slug === category)?.title
    : "Our Packages";

  return (
    <div className="pt-24 lg:pt-28 bg-gray-50/50">

      {/* 4 Collections Section */}
      <HolidayCollections />

      {/* All Packages Section */}
      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24 pt-8 sm:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              {currentCategory}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Handpicked itineraries for unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {filteredPackages.map((pkg) => (
              <HolidayCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
