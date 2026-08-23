import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  MapPin, 
  CheckCircle2, 
  Star, 
  Info,
  ArrowLeft
} from "lucide-react";
import HotelBookingForm from "@/components/HotelBookingForm";
import { hotels } from "@/data/hotels";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hotel = hotels.find((h) => h.slug === slug);
  if (!hotel) return { title: "Hotel Not Found" };
  return {
    title: `${hotel.title} | Kwik2Travels Hotels`,
    description: hotel.description,
  };
}

export function generateStaticParams() {
  return hotels.map((hotel) => ({
    slug: hotel.slug,
  }));
}

export default async function HotelDetailsPage({ params }) {
  const { slug } = await params;
  const hotel = hotels.find((h) => h.slug === slug);
  
  if (!hotel) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      {/* Breadcrumb / Back Navigation */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Link 
          href="/hotels" 
          className="inline-flex items-center text-sm font-medium text-maroon hover:text-maroon-deep transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to all Hotels
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        {/* Hero Section of Hotel */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-white shadow-xl lg:mb-12">
          <div className="relative h-[350px] w-full sm:h-[450px] lg:h-[550px]">
            <img
              src={hotel.image}
              alt={hotel.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center rounded-full bg-gold/90 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                  <Star className="mr-1 size-4 fill-white" />
                  {hotel.starRating} Star Property
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                  <MapPin className="mr-1.5 size-4" />
                  {hotel.location}
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl text-shadow-sm">
                {hotel.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          
          {/* Main Info (Left Column) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="mb-4 font-display text-2xl font-bold text-gray-900">
                About the Property
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                {hotel.description}
              </p>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 flex items-center">
                Property Amenities
              </h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {hotel.amenities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-0.5 size-5 flex-shrink-0 text-emerald-500" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Terms & Conditions */}
            <section className="rounded-2xl bg-gray-100 p-6 sm:p-8">
              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 flex items-center">
                <Info className="mr-3 size-6 text-gray-500" />
                Good to Know
              </h2>
              <ul className="space-y-3">
                {hotel.terms.map((term, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="mr-2 mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                    {term}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar / Booking Form (Right Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
              {/* Pricing Header */}
              <div className="bg-maroon-deep p-6 text-center text-white">
                <p className="text-sm font-medium opacity-80 uppercase tracking-wider mb-1">Starting Price</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-3xl font-bold">₹{hotel.startingPrice.toLocaleString("en-IN")}</span>
                  <span className="text-base font-normal opacity-80 mb-1">/ night</span>
                </div>
              </div>
              
              {/* Form Body */}
              <div className="p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900 text-center">
                  Request Room Quote
                </h3>
                <HotelBookingForm hotel={hotel} />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
