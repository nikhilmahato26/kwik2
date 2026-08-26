
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  CalendarDays, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Info,
  Clock,
  ArrowLeft
} from "lucide-react";
import PackageBookingForm from "@/components/PackageBookingForm";
import { getHolidayPackages, getHolidayPackageBySlug } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = await getHolidayPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.title} | Kwik2Travels Holidays`,
    description: `Book the ${pkg.title} package for ₹${pkg.startingPrice.toLocaleString("en-IN")}. ${pkg.duration} exploring ${pkg.placesCovered}.`,
  };
}

export async function generateStaticParams() {
  const holidayPackages = await getHolidayPackages();
  return holidayPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export default async function HolidayDetailsPage({ params }) {
  const { slug } = await params;
  const pkg = await getHolidayPackageBySlug(slug);
  
  if (!pkg) {
    notFound();
  }

  return (
    <div className="bg-gray-50 pb-20 pt-24 lg:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          href="/holidays" 
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-maroon"
        >
          <ArrowLeft className="size-4" />
          Back to all holidays
        </Link>

        {/* Hero Section of Package */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-white shadow-xl lg:mb-12">
          <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px]">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 lg:p-12">
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                  <Clock className="size-4" />
                  {pkg.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                  <MapPin className="size-4" />
                  {pkg.placesCovered}
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {pkg.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Section */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900">Package Overview</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Pricing Options</h3>
                  <ul className="space-y-3">
                    {pkg.pricing && typeof pkg.pricing === 'object' && Object.entries(pkg.pricing).map(([label, price]) => (
                      <li key={label} className="flex justify-between border-b border-gray-100 pb-2 text-sm">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-bold text-maroon-deep">{price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Key Info</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li><strong className="text-gray-900">Origin:</strong> {pkg.originCity}</li>
                    <li><strong className="text-gray-900">Validity:</strong> {pkg.validity}</li>
                    <li><strong className="text-gray-900">Hotels:</strong> {pkg.hotels}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Itinerary Section */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary && Array.isArray(pkg.itinerary) && pkg.itinerary.map((item, index) => (
                  <div key={index} className="relative pl-8 sm:pl-10">
                    <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white shadow-sm ring-4 ring-white">
                      {index + 1}
                    </div>
                    {index !== pkg.itinerary.length - 1 && (
                      <div className="absolute left-3 top-8 h-full w-0.5 bg-gray-200" />
                    )}
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                      <span className="mr-2 text-maroon-deep">{item.day}:</span>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 font-display text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" /> Inclusions
                </h2>
                <ul className="space-y-3">
                  {pkg.inclusions && Array.isArray(pkg.inclusions) && pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 font-display text-xl font-bold text-gray-900 flex items-center gap-2">
                  <XCircle className="size-5 text-red-500" /> Exclusions
                </h2>
                <ul className="space-y-3">
                  {pkg.exclusions && Array.isArray(pkg.exclusions) && pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <XCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Terms */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 font-display text-xl font-bold text-gray-900 flex items-center gap-2">
                <Info className="size-5 text-blue-500" /> Important Terms & Conditions
              </h2>
              <ul className="space-y-3 list-disc pl-5">
                {pkg.terms && Array.isArray(pkg.terms) && pkg.terms.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              {/* Use existing BookingForm with holidays tab default, perhaps we can just pass initial data if BookingForm allowed it, 
                  but since BookingForm state is internal, we'll just render it with a title above it, or we create a custom form for this page.
                  Given the requirements, using BookingForm is great, but users would have to fill in destination.
                  Let's render a custom simplified query form that specifically references this package. */}
              
              <div className="rounded-2xl bg-maroon-deep p-1">
                <div className="rounded-[14px] bg-white p-6 shadow-xl sm:p-8">
                  <h3 className="mb-2 font-display text-2xl font-bold text-maroon-deep">
                    Book This Package
                  </h3>
                  <p className="mb-6 text-sm text-gray-500">
                    Starting from <strong className="text-lg text-gray-900">₹{pkg.startingPrice.toLocaleString("en-IN")}</strong>
                  </p>
                  
                  {/* We can re-use the generic BookingForm but it's large. It's better to just render it here for holidays. 
                      However, to be "UI/UX designer" clever, we'll render a specific WhatsApp action form for THIS package. */}
                  <PackageBookingForm pkg={pkg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

