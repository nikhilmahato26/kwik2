import HotelCard from "@/components/HotelCard";
import { getHotels } from "@/lib/data";

export const metadata = {
  title: "Luxury Hotels & Resorts | Kwik2Travels",
  description:
    "Discover handpicked luxury hotels and resorts for your perfect getaway with Kwik2Travels.",
};

export default async function HotelsPage() {
  const hotels = await getHotels();
  return (
    <div className="pt-24 lg:pt-28 bg-gray-50/50 min-h-screen">
      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24 pt-8 sm:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Luxury Hotels
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Experience world-class hospitality in our handpicked selection of premium properties.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
